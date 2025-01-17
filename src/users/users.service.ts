import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ChangeUserRoleDto, EditProfileDto, OnboardDto } from './dtos';
import { hashPassword } from './utils/generate-password';
import { UserWithCount } from './dtos/all-users.dto';
import { ConfigService } from '@nestjs/config';
import { getPaginationMeta } from '../common/utility';
import { PaginationDto } from '../common/dtos';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ImageEntity } from 'src/common/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
    @InjectRepository(User) private repo: Repository<User>,
    private configService: ConfigService,
  ) {}

  async getSafeUserById(id: string, res: Response): Promise<void> {
    const user = await this.repo.findOne({ where: { id } });

    const safeUser = instanceToPlain(user);
    res.json({ user: safeUser });
  }

  findOne(id: string, withOtp?: boolean) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({
      where: { id },
      ...(withOtp && {
        relations: ['otpDetails'],
      }),
    });
  }

  // findOne(id: string, withOtp?: boolean) {
  //   if (!id) {
  //     return null;
  //   }
  //   const queryBuilder = this.repo
  //     .createQueryBuilder('user')
  //     .addSelect(['user.password', 'user.refreshToken'])
  //     .where('user.id = :id', { id })
  //     .andWhere('user.isEmailVerified = :isVerified', { isVerified: true });

  //   if (withOtp) {
  //     queryBuilder.leftJoinAndSelect('user.otpDetails', 'otpDetails');
  //   }

  //   return queryBuilder.getOne();
  // }

  findAccountByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findAccountByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findVerifiedAccountByEmail(email: string, withOtp?: boolean) {
    return this.repo.findOne({
      where: { email, isEmailVerified: true },
      ...(withOtp && {
        relations: ['otpDetails'],
      }),
    });
  }

  // findVerifiedAccountByEmail(email: string, withOtp?: boolean) {
  //   const queryBuilder = this.repo
  //     .createQueryBuilder('user')
  //     .addSelect(['user.password', 'user.refreshToken'])
  //     .where('user.email = :email', { email })
  //     .andWhere('user.isEmailVerified = :isVerified', { isVerified: true });

  //   if (withOtp) {
  //     queryBuilder.leftJoinAndSelect('user.otpDetails', 'otpDetails');
  //   }

  //   return queryBuilder.getOne();
  // }

  findVerifiedAccountById(id: string) {
    return this.repo.findOne({ where: { id, isEmailVerified: true } });
  }

  async onboard(
    user: User,
    { password, country, region, timezone }: OnboardDto,
  ) {
    if (password) {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
    }
    user.hasOnboarded = true;
    user.country = country;
    user.region = region;
    user.timezone = timezone;

    const updatedUser = await this.repo.save(user);

    return updatedUser;
  }

  async editProfile(
    user: User,
    {
      firstName,
      lastName,
      image,
      bio,
      country,
      languages,
      region,
      timezone,
    }: EditProfileDto,
  ) {
    console.log("🚀 ~ UsersService ~ user:", user)
    console.log({      firstName,
      lastName,
      image,
      bio,
      country,
      languages,
      region,
      timezone,
    });

    
    try {
      // Update basic user properties if provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (bio) user.bio = bio;
      if (country) user.country = country;
      if (languages) user.languages = languages;
      if (region) user.region = region;
      if (timezone) user.timezone = timezone;

      // Handle image upload if a new image is provided
      if (image) {
        try {
          console.log('Uploading image:', image);
          const imageUpload = (
            await this.cloudinaryService.uploadFiles(image)
          )[0];
          const uploadedImage = await this.imageRepo.save({
            imageName: imageUpload.original_filename,
            imageUrl: imageUpload.url,
          });

          // Associate uploaded image with user
          user.image = uploadedImage;
        } catch (error) {
          console.error('Error uploading image:', error);
          throw new InternalServerErrorException('Failed to upload image');
        }
      }

      // Save updated user profile in the repository
      const updatedUser = await this.repo.save(user);

      // Return the updated user profile
      return { user: updatedUser };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new InternalServerErrorException('Failed to update profile');
    }
  }

  async getAllUsers({ pageIndex = 0, pageSize = 10 }: PaginationDto) {
    const [users, totalItems] = await this.repo
      .createQueryBuilder('user')
      .where('user.isEmailVerified = :isEmailVerified', {
        isEmailVerified: true,
      })
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.country',
        'user.provider',
        'user.role',
        'user.createdAt',
        'user.updatedAt',
      ])
      .orderBy('user.updatedAt', 'DESC')
      .skip(pageIndex * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const paginationMeta = getPaginationMeta(
      { pageIndex, pageSize },
      { totalItems, itemsOnPage: users.length },
    );

    return { users: users as UserWithCount[], paginationMeta };
  }

  async changeUserRole(userId: string, { role }: ChangeUserRoleDto) {
    const user = await this.findVerifiedAccountById(userId);
    if (!user) throw new NotFoundException('User Not Found');

    if (
      user.email ===
      this.configService.getOrThrow<string>('PRIMARY_ADMIN_EMAIL')
    ) {
      throw new BadRequestException(
        'Cannot change the role of primary super admin',
      );
    }

    user.role = role;
    return await this.repo.save(user);
  }
}
