// otp.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { Otp, OtpDocument } from './schemas/auth.schema';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
  ) {}

  generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
  }

  async sendOtp(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use any email service
      auth: {
        user: 'premshakti.ps@gmail.com', // Your email address
        pass: 'xygp chqo xese nxdx', // Your email password
      },
      tls: {
        rejectUnauthorized: false, // Disable certificate validation
      },
    });

    const mailOptions = {
      from: 'premshakti.ps@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async saveOtp(email: string, otp: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5); // OTP valid for 5 minutes

    // Save OTP to MongoDB
    const otpDocument = new this.otpModel({ email, otp, expiresAt });
    await otpDocument.save();
  }

  async validateOtp(email: string, otp: string): Promise<boolean> {
    console.log(email,otp)
    const otpRecord = await this.otpModel.findOne({ email }).exec();

    if (!otpRecord) return false; // No OTP found for the email

    if (otpRecord.expiresAt < new Date()) {
      // OTP is expired, delete it from the database
      await this.otpModel.deleteOne({ email }).exec();
      return false;
    }

    if (otpRecord.otp === otp) {
      // OTP is valid, delete it from the database and return true
      await this.otpModel.deleteOne({ email }).exec();
      return true;
    }

    return false; // OTP did not match
  }


  async deleteOtp(email: string): Promise<void> {
    await this.otpModel.deleteMany({ email }).exec();
  }
}
