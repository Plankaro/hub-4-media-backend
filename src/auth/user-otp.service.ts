import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UserOtp } from './user-otp.entity';
import { generateOtp, hashOtp } from './utils/generate-otp';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserOtpService {
  constructor(
    @InjectRepository(UserOtp) private otpRepo: Repository<UserOtp>,
  ) {}

  async createOtp(user: User) {
    const otp = generateOtp();

    const hashedOtp = await hashOtp(otp);

    const otpValidMinutes = 5;
    const otpExpiresAt = new Date(Date.now() + otpValidMinutes * 60000);

    const otpDetails = this.otpRepo.create({
      user,
      otp: hashedOtp,
      createdAt: new Date(),
      expiresAt: otpExpiresAt,
    });

    await this.otpRepo.save(otpDetails);

    return { otp };
  }

  async validateOtp(otp: string, otpDetails: UserOtp) {
    if (otpDetails.otpAuthRestricted) {
      const currentTime = new Date();
      if (currentTime < otpDetails.otpAuthRestrictedTill) {
        throw new ForbiddenException(
          'Too many OTP Attempts. Try after some time.',
        );
      } else {
        otpDetails.otpAuthRestricted = false;
        otpDetails.otpAttempts = 0;
        otpDetails.otpAuthRestrictedTill = null;
        await this.otpRepo.save(otpDetails);
      }
    }

    const now = new Date();
    if (now > otpDetails.expiresAt) {
      await this.deleteOtp(otpDetails);
      throw new BadRequestException('Otp expired');
    }

    const match = await bcrypt.compare(otp, otpDetails.otp);

    if (!match) {
      otpDetails.otpAttempts++;
      if (otpDetails.otpAttempts >= 5) {
        otpDetails.otpAuthRestricted = true;
        otpDetails.otpAuthRestrictedTill = new Date(
          Date.now() + 1 * 60 * 60 * 1000,
        );
      }
      await this.otpRepo.save(otpDetails);
      throw new BadRequestException('Incorrect otp');
    }
  }

  async deleteOtp(otpDetails: UserOtp) {
    await this.otpRepo.delete(otpDetails.id);
  }
}
