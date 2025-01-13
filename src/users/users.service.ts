import {
  BadRequestException,
  Injectable,
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

@Injectable()
export class UsersService {
  constructor(
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

  async editProfile(user: User, { firstName, lastName }: EditProfileDto) {
    user.firstName = firstName;
    user.lastName = lastName;

    const updatedUser = await this.repo.save(user);
    return { user: updatedUser };
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
