import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { AccountProviderType, RoleType } from '@prisma/client';
import { filter } from 'lodash';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { LocalUser, SessionUser } from './interfaces/user.interface';
import { addDays } from 'date-fns';
import { GoogleProfileInterface } from './interfaces/google-profile.interface';
import { ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';
import { EnvironmentVariable } from 'src/utils/env.validation';
import { PrismaService } from 'src/prismaORM/prisma.service';
import { UserService } from 'src/user/user.service';

dotenv.config();

interface USER {
  name: {
    familyName: string;
    givenName: string;
  };
  image: {
    value: string;
  }[];
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) // private readonly configService: ConfigService<EnvironmentVariable, true>,
  { }

  async signIn(role: RoleType, _: SignInDto, res: Response, user: LocalUser) {
    const { id } = user;

    if (user.role !== role) {
      console.log('Unauthorized role');
      throw new UnauthorizedException('Login to the dashboard is not allowed');
    }
    const expiryAt = addDays(new Date(), 7).toISOString();
    this.prisma.session
      .create({
        data: {
          expiryAt,
          role,
          user: {
            connect: {
              id,
            },
          },
        },
      })
      .then((session) => {
        const token = this.jwt.sign({ sid: session.id, role: session.role });
        res.cookie('token', token, {
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(201).json({
          // id:id,
          isActive: session.isActive,
          User: user,
        });
      });
  }

  async validateUser(payload: SignInDto) {
    const { username, password } = payload;
    console.log(username, password);
    return this.prisma.user
      .findFirst({
        where: {
          OR: [
            {
              email: username,
            },
            {
              mobileNumber: {
                equals: username,
              },
            },
          ],
          isTrash: false,
          accounts: {
            some: {
              provider: AccountProviderType.CREDENTIAL,
              isTrash: false,
              passwordHash: {
                not: null,
              },
              OR: [
                {
                  username: {
                    equals: username,
                  },
                },
                {
                  email: {
                    equals: username,
                  },
                },
                {
                  mobileNumber: {
                    equals: username,
                  },
                },
              ],
            },
          },
        },
        select: {
          id: true,
          mobileNumber: true,
          role: true,
          accounts: {
            where: {
              isTrash: false,
              provider: AccountProviderType.CREDENTIAL,
            },
          },
        },
      })
      .then((user) => {
        console.log(user);
        if (!user) throw new NotFoundException(' user Not found');
        const { accounts } = user;
        const isPasswordValid = filter(accounts).some((account) => {
          const { passwordHash } = account;
          if (!passwordHash) return false;
          return compareSync(password, passwordHash);
        });
        console.log(isPasswordValid);
        if (!isPasswordValid) throw new UnauthorizedException();
        return user;
      });
  }

  async validateGoogleLoginUser(profile: GoogleProfileInterface) {
    const { emails, id } = profile;
    const email = emails[0].value;
    try {
      const user: any = await this.prisma.user.findUnique({
        where: {
          email,
          isTrash: false,
        },
      });

      if (!user) {
        return false;
      }

      // return this.prisma.account.create({
      //   data: {
      //     provider: AccountProviderType.GOOGLE,
      //     providerId: id,
      //     username: email,
      //     user: {
      //       connect: {
      //         id: user.id,
      //       },
      //     },
      //   },
      //   include: {
      //     user: true,
      //   },
      // });
      return user;
    } catch (err: any) {
      throw new InternalServerErrorException(err?.message);
    }
  }

  async getSession(Userrole: RoleType, id: string) {
    return this.prisma.session
      .findUnique({
        where: {
          id,
          isActive: true,
          user: {
            isNot: undefined,
          },
          role: {
            not: undefined,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              role: true,
              email: true,
              image: true,
              skills: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      })
      .then((session) => {
        if (!session) throw new NotFoundException();
        const role = session?.role;
        // console.log({session, role});
        if (Userrole !== role) {
          console.log({ Userrole, role });
          throw new BadRequestException(
            `please logged in to ${role} dashboard`,
          );
        }

        return session;
      });
  }

  async googleLogin(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new NotFoundException("User isn't found");
    }
    const user: any = req.user;
    console.log(user);
    const isProd = process.env.NODE_ENV === 'production';
    const redirectUrl = 'https://job.stackkaroo.com';
    // https://job.stackkaroo.com/jobpost
    // const redirectUrl = 'http://localhost:3000';

    if (user.isExistingUser) {
      const account = user.data;
      const { id } = user.data;
      const expiryAt = addDays(new Date(), 7).toISOString();
      this.prisma.session
        .create({
          data: {
            expiryAt,
            user: {
              connect: {
                id,
              },
            },
            role: RoleType.STUDENT,
          },
        })
        .then((session) => {
          const token = this.jwt.sign({ sid: session.id, role: session.role });
          console.log('-> token', session);
          res
            .cookie('token', token, {
              sameSite: 'strict',
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            .redirect(redirectUrl);

        });
    } else {
      res.redirect('https://job.stackkaroo.com/auth');
      // res.send(
      //   `<h1>Please sign up first </h1> </br> <a href="${redirectUrl}">Go Home</a>`,
      // );
      // console.log(user.data as USER);
      // const redirectUri = "https://job.stackkaroo.com"

      // this.userService.createUser("STUDENT",user.data)
      // const { name, image, email } = user.data as USER;
      // this.prisma.user.create({
      //   data: {
      //     firstName: name.familyName,
      //     lastName: name.givenName,
      //     email,
      //     image: {
      //       set: {
      //         name: 'profile',
      //         url: image[0].value,
      //       },
      //     },
      //     role: RoleType.STUDENT,
      //   },
      // }).then((user) => {
      //   const { id } = user;
      //   const expiryAt = addDays(new Date(), 7).toISOString();
      //   this.prisma.session
      //     .create({
      //       data: {
      //         expiryAt,
      //         user: {
      //           connect: {
      //             id,
      //           },
      //         },
      //         role: RoleType.STUDENT,
      //       },
      //     })
      //     .then((session) => {
      //       const token = this.jwt.sign({ sid: session.id, role: session.role });
      //       console.log('-> token', token);
      //       res
      //         .cookie('token', token, {
      //           sameSite: 'strict',
      //           secure: true,
      //           maxAge: 1000 * 60 * 60 * 24 * 7,
      //         })
      //         .redirect(redirectUrl);

      //     });
      // })
    }
  }

  async signOut(res: Response, session: SessionUser) {
    const { id } = session;
    this.prisma.session
      .update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      })
      .then(({ isActive }) => {
        res.clearCookie('token');
        res.status(201).json({
          isActive,
        });
      });
  }
}
