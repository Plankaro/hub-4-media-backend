import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  AccountProviderType,
  EmploymentStatusType,
  RoleType,
} from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { capitalize, isEmpty } from 'lodash';
import {
  GetUserByDto,
  GetUserByRoleDto,
  GetUserFromWebsocket,
} from './dto/get-user.dto';
import { DeleteUsersDto } from './dto/delete-user.dto';
import {
  CreateExperienceDto,
  CreateProjectDto,
  UpdateExperienceDto,
  UpdateProjectDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { ForgotPassword } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SessionUser } from '../auth/interfaces/user.interface';
import { EnvironmentVariable } from 'src/utils/env.validation';
import { PrismaService } from 'src/prismaORM/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService<EnvironmentVariable>,
    private cloudinary: CloudinaryService,
    private readonly emailservice: EmailService
  ) { }

  async createUser(role: RoleType, data: CreateUserDto) {
    const { email, firstName, mobileNumber, image, password, ...rest } = data;

    let tempPassword: string;
    const saltRounds = genSaltSync(this.config.get('BCRYPT_SALT_ROUNDS'));

    console.log('-> tempPassword', tempPassword);

    return this.prisma.user
      .findUnique({
        where: {
          mobileNumber,
          email,
        },
        select: {
          id: true,
        },
      })
      .then(async (value) => {
        if (value) {
          throw new InternalServerErrorException({
            succcess: false,
            msg: 'you are already registered 🤨',
          });
        }
        const imageUpload = (await this.cloudinary.uploadFiles(image))[0];
        return this.prisma.user.create({
          data: {
            email,
            firstName,
            mobileNumber,
            ...(imageUpload &&
              imageUpload.url && {
              image: {
                set: {
                  name: imageUpload.original_filename,
                  url: imageUpload.url,
                },
              },
            }),
            role,
            ...rest,
            accounts: {
              create: {
                provider: AccountProviderType.CREDENTIAL,
                providerId: AccountProviderType.CREDENTIAL,
                email,
                mobileNumber,
                username: mobileNumber,
                passwordHash: hashSync(password, saltRounds),
              },
            },
          },
          include: {
            accounts: true,
          },
        });
      });
  }

  async postExperience(data: CreateExperienceDto) {
    const { userId, ...rest } = data;
    console.log(data);
    await this.prisma.experience.create({
      data: {
        ...rest,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return {
      success: true,
      message: 'Experience added successfully',
    };
  }

  async postProject(data: CreateProjectDto) {
    const { userId, ...rest } = data;
    await this.prisma.projects.create({
      data: {
        ...rest,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Project created successfully',
    };
  }

  async updateUser(role: RoleType, data: UpdateUserDto) {
    try {
      const { id, image, project, experience, ...rest } = data;
      // console.log(data);
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          isTrash: false,
        },
      });
      if (!user) {
        throw new InternalServerErrorException('user not found');
      }
      const imageUpload = image
        ? (await this.cloudinary.uploadFiles(image))[0]
        : undefined;

      if (project) {
        await this.prisma.projects.update({
          where: {
            id: project.id,
          },
          data: {
            title: project.title,
            description: project.description,
            link: project.link,
          },
        });
      }
      if (experience) {
        const { id, ...rest } = experience;
        await this.prisma.experience.update({
          where: {
            id: id,
            isTrash: false,
          },
          data: {
            ...rest,
          },
        });
      }

      await this.prisma.user.update({
        where: {
          id,
          isTrash: false,
        },
        data: {
          ...rest,
          ...(image &&
            imageUpload &&
            imageUpload.url && {
            image: {
              set: {
                name: imageUpload.original_filename,
                url: imageUpload.url,
              },
            },
          }),
        },
        include: {
          employeeStatus: true,
          projects: true,
        },
      });

      return {
        success: true,
        message: 'Profile Updated Successfully',
      };
    } catch (err) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Could not update user',
      });
    }
  }

  getAllUsers(params: GetUserByRoleDto) {
    const { role } = params;
    return this.prisma.user.findMany({
      where: {
        isTrash: false,
      }, include: {
        appliedJobs: {
          where: {
            isTrash: false

          }
        }
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  getAllProject(userId: string) {
    return this.prisma.projects.findMany({
      where: {
        isTrash: false,
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  getAllExperience(userId: string) {
    return this.prisma.experience.findMany({
      where: {
        isTrash: false,
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  getAllSkills(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        isTrash: false,
        id: userId,
      },
      select: {
        skills: true,
      },
    });
  }
  async postSkills(userId: string, skills: string[]) {
    try {
      if (skills.length == 0) {
        return {
          success: false,
          message: 'please select atleast one skill',
        };
      }
      const user = await this.prisma.user.findUnique({
        where: {
          isTrash: false,
          id: userId,
        },
      });
      console.log(skills);
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }

      // Create a new set to hold the unique skills (no duplicates)
      const uniqueSkills = new Set([...user.skills, ...skills]);

      // Convert the set back to an array
      const updatedSkills = Array.from(uniqueSkills);

      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          skills: updatedSkills,
        },
      });

      return {
        success: true,
        message: 'Skills updated successfully',
      };
    } catch (err) {
      throw new InternalServerErrorException({
        success: false,
        message: 'failed to add skills',
      });
    }
  }

  async deleteSkills(userId: string, skills: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new NotFoundException('user Not Exists');
      }
      const allskills = user.skills;

      const filterskills: string[] = allskills.filter(
        (skill) => skills != skill,
      );
      console.log(filterskills);
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          skills: filterskills,
        },
      });
      return {
        success: true,
        message: 'skill updated successfully',
      };
    } catch (err) {
      throw new InternalServerErrorException({
        success: false,
        message: 'failed to delete skill',
      });
    }
  }


  async sendOtp(email: string) {
    try {
      const otpData = await this.prisma.otp.findFirst({
        where: {
          email,
        },
      });
      if (otpData) {
        await this.prisma.otp.delete({
          where: {
            email,
          },
        });
      }

      function generateSixDigitOTP(): number {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const otp: number = generateSixDigitOTP();
      await this.emailservice.sendOTPEmail(email, otp);
      await this.prisma.otp.create({
        data: {
          email,
          otp,
        },
      });
      return {
        success: true,
        message: 'otp send sucessfully',
      };
    } catch (err) {
      return new InternalServerErrorException({
        success: false,
        message: 'otp send failed',
      });
    }
  }

  async verifyOtp(email: string, otp: number): Promise<any> {
    try {
      console.log('verify');
      const otpData = await this.prisma.otp.findFirst({
        where: {
          AND: [{ email }, { otp }],
        },
      });
      if (!otpData) {
        throw new NotFoundException({ message: 'No otp found' });
      }

      return {
        success: true,
        message: 'otp successfully verified',
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async forgotPassword(data: ForgotPassword): Promise<any> {
    try {
      const { email, newPassword } = data;
      const saltRounds = genSaltSync(this.config.get('BCRYPT_SALT_ROUNDS'));
      const daa = await this.prisma.account.updateMany({
        where: {
          email,
          isTrash: false,
          provider: AccountProviderType.CREDENTIAL,
        },
        data: {
          passwordHash: hashSync(newPassword, saltRounds),
        },
      });
      console.log(daa)
      return {
        success: true,
        message: "password changed successfully"
      }
    } catch (err: any) {
      return new InternalServerErrorException(err.message);
    }
  }

  async changePassword(data: ChangePasswordDto, session: SessionUser) {
    const { oldPassword, newPassword } = data;
    const { userId } = session;
    const saltRounds = genSaltSync(this.config.get('BCRYPT_SALT_ROUNDS'));

    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
        include: {
          accounts: {
            where: {
              isTrash: false,
              provider: AccountProviderType.CREDENTIAL,
            },
          },
        },
      })
      .then((value) => {
        if (!value) {
          throw new NotFoundException({
            msg: "User isn't found",
          });
        } else {
          const { accounts } = value;
          const account = accounts[0];
          if (!account) {
            throw new NotFoundException({
              msg: "Account isn't found",
            });
          } else {
            const { id, passwordHash } = account;
            if (passwordHash && compareSync(oldPassword, passwordHash)) {
              return this.prisma.account.update({
                where: {
                  id,
                },
                data: {
                  passwordHash: hashSync(newPassword, saltRounds),
                },
              });
            } else {
              throw new NotFoundException({
                msg: 'Old Password is incorrect',
              });
            }
          }
        }
      });
  }

  async deleteUser(body: DeleteUsersDto) {
    const { ids } = body;
    return this.prisma.user
      .updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          isTrash: true,
        },
      })
      .then(({ count }) => {
        return {
          count,
          message: `Deleted ${count} users`,
        };
      });
  }

  getSudentsCount() {
    return this.prisma.user.count({
      where: {
        isTrash: false,
      },
    });
  }

  getUserById(params: GetUserByDto) {
    const { id } = params;
    return this.prisma.user.findUnique({
      where: {
        id,
        isTrash: false,
      },
    });
  }
}
