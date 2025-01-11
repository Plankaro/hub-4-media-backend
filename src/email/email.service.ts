import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendOTPEmail(toEmail: string, otp: string): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mailt6486@gmail.com',
          pass: process.env.APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: 'StackKaroo <mailt6486@gmail.com>',
        to: toEmail,
        subject: 'Verification Code',
        html: `
          <p>This OTP is valid for a limited duration.</p>
  
          <p>Email: ${toEmail}</p>
          <p>OTP: ${otp}</p>
  
          <p>Thank you for your cooperation.</p>
        `,
      });

      console.log('Email sent successfully:', info.messageId);
      return otp;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendResetPasswordLink(
    toEmail: string,
    resetPasswordLink: string,
  ): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mailt6486@gmail.com',
          pass: process.env.APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: 'StackKaroo <mailt6486@gmail.com>',
        to: toEmail,
        subject: 'Verification Code',
        html: `
          <p>This Link is valid for a limited duration.</p>
  
          <p>Email: ${toEmail}</p>
          <p>Reset Password Link: ${resetPasswordLink}</p>
  
          <p>Thank you for your co-operation.</p>
        `,
      });

      console.log('Email sent successfully:', info.messageId);
      return resetPasswordLink;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  // async sendContactInfo(data: ContactUsDto) {
  //   const { name, email, mobileNumber, message } = data;
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'mailt6486@gmail.com',
  //       pass: process.env.APP_PASSWORD,
  //     },
  //   });

  //   return transporter
  //     .sendMail({
  //       from: 'GPFTPC <mailt6486@gmail.com>',
  //       to: 'gpftpsconline@gmail.com',
  //       subject: 'Contact Us Page',
  //       html: `
  //       <p>Name: ${name}</p>
  //       <p>Email: ${email}</p>
  //       <p>Mobile Number: ${mobileNumber}</p>
  //       <p>Message: ${message}</p>
  //     `,
  //     })
  //     .then((value) => {
  //       console.log('-> value', value);
  //       return {
  //         success: true,
  //         message: 'Email sent successfully',
  //       };
  //     });
  // }
}
