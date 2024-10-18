import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { Users } from './schemas/auth.schema';
import { signUpDto } from './dto/signup.dto';
import { loginDto, loginOtpDto } from './dto/login.dto';
import { OtpService } from './otp.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name)
    private authModal: Model<Users>,
    private jwts: JwtService,
    private otpService: OtpService,
  ) {}

  async signup(
    signUpDto: signUpDto,
  ): Promise<{ message: string; success: boolean }> {
    const { email, password } = signUpDto;

    // Check if the user already exists
    const existingUser = await this.authModal.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('User already registered with this email');
    }
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(signUpDto.password, saltRounds);

    // Replace plain password with hashed password
    const userWithHashedPassword = { ...signUpDto, password: hashedPassword };

    const createdUser = new this.authModal(userWithHashedPassword);
    const user = await createdUser.save();

    return { message: 'User added successfully', success: true };
  }

  async login(loginDto: loginDto, res: Response): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.authModal.findOne({ email }).exec();

    if (user) {
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Generate a JWT token
        const payload = { sub: user._id, name: user.email };
        const token = this.jwts.sign(payload);
        // res.cookie('jwt', token, { httpOnly: true });
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NOD_ENV === 'production',
        });

        res.status(200).json({
          message: 'User verified successfully',
          token,
          success: true,
        });
        // return { message: 'User verified successfully', token, success: true };
      } else {
        res.json({ message: 'Invalid credentials', success: false });
      }
    } else {
      res.json({ message: 'User not found', success: false });
    }
  }

  async checkAuth(token: string): Promise<boolean> {
    if (!token) {
      return false;
    }

    try {
      // Verify JWT token
      const decoded = this.jwts.verify(token);
      return !!decoded;
    } catch (err) {
      return false;
    }
  }

  async sendOtp(email: string): Promise<{ message: string; success: boolean }> {
    // Check if the user exists

    const user = await this.authModal.findOne({ email }).exec();
    if (!user) {
      console.log('email', email);
      throw new BadRequestException('User with this email does not exist');
    }

    // Generate and send OTP
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(email, otp);
    await this.otpService.sendOtp(email, otp);

    return { message: 'OTP sent successfully', success: true };
  }

  async loginWithOtp(
    loginOtpDto: loginOtpDto,res: Response
  ): Promise<any> {
    const { email, otp } = loginOtpDto;

    const user = await this.authModal.findOne({ email }).exec();
    if (!user) {
      res.status(400).json({ message: 'User not found', success: false }) ;
    }

    // Validate the OTP
    const isOtpValid = await this.otpService.validateOtp(email, otp);

    if (isOtpValid) {
      await this.authModal.updateOne({ email }, { emailVerify: true }).exec();
      // Generate JWT token
      const payload = { sub: user._id, name: user.email };
      const token = this.jwts.sign(payload);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NOD_ENV === 'production',
      });

      res.status(200).json({
        message: 'OTP verified successfully',
        token,
        success: true,
      });
      // return { message: 'OTP verified successfully', token, success: true };
    } else {

       res.json({ message: 'Invalid or expired OTP', success: false });
    }
  }

  async forgetPassword(email: string): Promise<{ message: string,success:boolean }> {
    const user = await this.authModal.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    // Generate and send OTP
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(email, otp);
    await this.otpService.sendOtp(email, otp);

    return { message: 'OTP sent successfully',success:true };
  }

  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<{ message: string; success: boolean }> {
    const user = await this.authModal.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Validate the OTP
    const isOtpValid = this.otpService.validateOtp(email, otp);
    if (!isOtpValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await this.authModal
      .updateOne({ email }, { password: hashedPassword })
      .exec();

    // Optionally, delete the OTP from the database if stored there
    this.otpService.deleteOtp(email);

    return { message: 'Password updated successfully', success: true };
  }

  logoutUser(res: Response) {
    console.log('logout');
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ message: 'Logged out successfully', success: true });
  }
}
