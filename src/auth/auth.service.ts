import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import {
  hashPassword,
  generatePassword,
} from '../users/utils/generate-password';
import {
  VerifyEmailDto,
  RequestSignInLinkDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInUserDto,
  SignUpUserDto,
  ResendVerificationEmailDto,
  OAuthSignUpDto,
  AuthProviderDto,
  VerifyOtpDto,
  VerifyTokenDto,
} from './dtos';
import { ConfigService } from '@nestjs/config';
import { UserOtpService } from './user-otp.service';
import { TokenType } from '../users/types/token-type';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { TokenService } from './token.service';
import { EmailService } from 'src/email/email.service';
import { EnvironmentVariable } from 'src/utils/env.validation';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private usersService: UsersService,
    private otpService: UserOtpService,
    private emailService: EmailService,
    private configService: ConfigService<EnvironmentVariable, true>,
    private tokenService: TokenService,
  ) { }

  async signIn({ email, password }: SignInUserDto, res: Response) {
    const user = await this.usersService.findVerifiedAccountByEmail(email);
    if (!user) {
      throw new NotFoundException('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException('Incorrect email or password');
    }

    await this.authenticateUser(user, res);
  }

  async oAuthSignUp(
    { email, firstName, lastName }: OAuthSignUpDto,
    { providerAuthId, provider }: AuthProviderDto,
  ) {
    const existingUser =
      await this.usersService.findVerifiedAccountByEmail(email);

    if (existingUser) {
      const { validationToken } =
        await this.tokenService.generateValidationToken(existingUser);

      const redirectUrl = `${this.configService.get(
        'AUTH_UI_URL',
      )}/sign-in-with-token?token=${validationToken}`;
      return { redirectUrl };
    }

    const generatedPassword = generatePassword(16);

    const hashedPassword = await hashPassword(generatedPassword);

    const username = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;

    const createdUser = this.userRepo.create({
      username,
      email,
      password: hashedPassword,
      provider,
      providerAuthId,
      firstName,
      lastName,
      isEmailVerified: true,
    });

    const user = await this.userRepo.save(createdUser);

    const { validationToken } =
      await this.tokenService.generateValidationToken(user);

    const redirectUrl = `${this.configService.get(
      'AUTH_UI_URL',
    )}/sign-in-with-token?token=${validationToken}`;

    return { redirectUrl };
  }

  async signUp({
    username,
    firstName,
    lastName,
    email,
    password,
  }: SignUpUserDto) {
    const existingUser =
      await this.usersService.findVerifiedAccountByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = this.userRepo.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const user = await this.userRepo.save(createdUser);

    const { otp } = await this.otpService.createOtp(user);

    // Send otp
    await this.emailService.sendOTPEmail(email, otp);

    return {
      message: `You have been successfully registered! Please check your email ${email} for a otp`,
      email,
      userId: user.id,
    };
  }

  async resendVerificationEmail({ userId, email }: ResendVerificationEmailDto) {
    const existingUser = await this.usersService.findOne(userId, true);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    if (existingUser.email !== email) {
      throw new BadRequestException('Email does not match');
    }

    const alreadyVerifiedAccount =
      await this.usersService.findVerifiedAccountByEmail(email);

    if (alreadyVerifiedAccount) {
      throw new BadRequestException(
        'Email is already verified. Please login instead',
      );
    }

    if (existingUser.otpDetails) {
      await this.otpService.deleteOtp(existingUser.otpDetails);
    }

    const { otp } = await this.otpService.createOtp(existingUser);

    await this.emailService.sendOTPEmail(email, otp);

    return {
      message: `We have resent the otp! Please check your email ${email} for a otp`,
      email,
      userId: existingUser.id,
    };
  }

  async verifyEmail({ otp, userId }: VerifyEmailDto, res: Response) {
    const user = await this.usersService.findOne(userId, true);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('User already verified');
    }

    const otherUserWithEmailVerified =
      await this.usersService.findVerifiedAccountByEmail(user.email);

    if (otherUserWithEmailVerified) {
      throw new BadRequestException('Email already in use');
    }

    const { otpDetails } = user;

    if (!otpDetails) {
      throw new BadRequestException('No otp found');
    }

    await this.otpService.validateOtp(otp, otpDetails);

    await this.otpService.deleteOtp(otpDetails);

    user.isEmailVerified = true;

    await this.userRepo.save(user);

    await this.authenticateUser(user, res);
  }

  /** @deprecated */
  async requestSignInLink({ email }: RequestSignInLinkDto) {
    const user = await this.usersService.findVerifiedAccountByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found for given email');
    }

    const { validationToken } =
      await this.tokenService.generateValidationToken(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const signInWithTokenLink = `${this.configService.get(
      'AUTH_UI_URL',
    )}/sign-in-with-token?token=${validationToken}`;

    // await this.mailService.sendMail({
    //   to: email,
    //   subject: 'Sign In With Login Link',
    //   htmlBody: `
    //   Here's your Login Link : ${signInWithTokenLink}
    //   `,
    // });

    return {
      message: `Please check your email ${email} for a sign in link`,
    };
  }

  async signInWithToken({ verificationToken }: VerifyTokenDto, res: Response) {
    const { id } = await this.tokenService.verifyToken(
      verificationToken,
      TokenType.VALIDATION,
    );

    const user = await this.usersService.findVerifiedAccountById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.authenticateUser(user, res);
  }

  async requestSignInOtp({ email }: RequestSignInLinkDto) {
    const user = await this.usersService.findVerifiedAccountByEmail(
      email,
      true,
    );

    if (!user) {
      throw new NotFoundException('User not found for given email');
    }

    if (user.otpDetails) {
      await this.otpService.deleteOtp(user.otpDetails);
    }

    const { otp } = await this.otpService.createOtp(user);

    // Send otp
    await this.emailService.sendOTPEmail(email, otp);

    return {
      message: `Please check your email ${email} for a otp`,
    };
  }

  async signInWithOtp({ email, otp }: VerifyOtpDto, res: Response) {
    const user = await this.usersService.findVerifiedAccountByEmail(
      email,
      true,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { otpDetails } = user;

    if (!otpDetails) {
      throw new BadRequestException('No otp found');
    }

    await this.otpService.validateOtp(otp, otpDetails);

    await this.otpService.deleteOtp(otpDetails);

    await this.authenticateUser(user, res);
  }

  async refreshSession(refreshToken: string, res: Response) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('Missing Refresh Token');
      }

      const { id } = await this.tokenService.verifyToken(
        refreshToken,
        TokenType.REFRESH,
      );

      const user = await this.usersService.findVerifiedAccountById(id);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid Token');
      }

      const { refreshToken: newRefreshToken } =
        await this.tokenService.generateRefreshToken(user);

      this.tokenService.setRefreshTokenCookie(newRefreshToken, res);

      user.refreshToken = newRefreshToken;
      await this.userRepo.save(user);

      const { accessToken } = await this.tokenService.generateAccessToken(user);

      res.json({ accessToken });
    } catch (error) {
      this.tokenService.clearRefreshTokenCookie(res);
      throw error;
    }
  }

  async logout(refreshToken: string, res: Response) {
    if (!refreshToken) {
      return res.status(200).json({ message: 'Successfully logged out' });
    }

    const { id } = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );

    const user = await this.usersService.findVerifiedAccountById(id);

    if (!user || user.refreshToken !== refreshToken) {
      this.tokenService.clearRefreshTokenCookie(res);
      return res.status(200).json({ message: 'Successfully logged out' });
    }

    this.tokenService.clearRefreshTokenCookie(res);
    user.refreshToken = '';

    await this.userRepo.save(user);

    return res.status(200).json({ message: 'Successfully logged out' });
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.findVerifiedAccountByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found for given email');
    }

    const { validationToken } =
      await this.tokenService.generateValidationToken(user);

    const resetPasswordLink = `${this.configService.get(
      'AUTH_UI_URL',
    )}/reset-password?token=${validationToken}`;

    await this.emailService.sendResetPasswordLink(email, resetPasswordLink);

    return {
      message: `Please check your email ${email} for a password reset link`,
    };
  }

  async resetPassword(
    { verificationToken, password }: ResetPasswordDto,
    res: Response,
  ) {
    const { id } = await this.tokenService.verifyToken(
      verificationToken,
      TokenType.VALIDATION,
    );

    const user = await this.usersService.findVerifiedAccountById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.hasSetPassword = true;

    await this.userRepo.save(user);

    res.json({
      message:
        'Password Reset Successfully! Please proceed to log in with your updated credentials.',
    });
  }

  private async authenticateUser(user: User, res: Response) {
    const { accessToken } = await this.tokenService.generateAccessToken(user);
    const { refreshToken } = await this.tokenService.generateRefreshToken(user);

    // TODO: Hash the token before saving into DB
    user.refreshToken = refreshToken;

    await this.userRepo.save(user);

    this.tokenService.setRefreshTokenCookie(refreshToken, res);

    const safeUser = instanceToPlain(user);

    res.json({ accessToken, user: safeUser });
  }
}
