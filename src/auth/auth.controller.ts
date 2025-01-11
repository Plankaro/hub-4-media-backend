import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  VerifyEmailDto,
  RequestSignInLinkDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInUserDto,
  SignUpUserDto,
  ResendVerificationEmailDto,
  SignedInUserDto,
  SuccessMessageDto,
  VerificationEmailSentDto,
  VerifyOtpDto,
  VerifyTokenDto,
  RefreshedSessionDto,
} from './dtos';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthProvider } from '../users/types/account-type';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { redirectUrl } = await this.authService.oAuthSignUp(req.user, {
      provider: AuthProvider.GOOGLE,
      providerAuthId: req.user.providerAuthId,
    });
    res.redirect(redirectUrl);
  }

  @ApiOkResponse({ type: VerificationEmailSentDto })
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @Post('/sign-up')
  async signUp(@Body() body: SignUpUserDto): Promise<VerificationEmailSentDto> {
    return this.authService.signUp(body);
  }

  @ApiOkResponse({ type: VerificationEmailSentDto })
  // @Throttle({ default: { limit: 2, ttl: 30 * 1000 } })
  @Post('/resend-verification-email')
  async resendVerificationEmail(
    @Body() body: ResendVerificationEmailDto,
  ): Promise<VerificationEmailSentDto> {
    return this.authService.resendVerificationEmail(body);
  }

  @ApiOkResponse({ type: SignedInUserDto })
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @Post('/verify-email')
  async verifyEmail(
    @Res() res: Response,
    @Body() body: VerifyEmailDto,
  ): Promise<void> {
    return this.authService.verifyEmail(body, res);
  }

  @ApiOkResponse({ type: SignedInUserDto })
  @Post('/verify-user')
  async verifyEmailToken(@Body() body: VerifyTokenDto, @Res() res: Response) {
    return this.authService.verifyUserWithToken(body, res);
  }

  @Post('/sign-in')
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @ApiOkResponse({ type: SignedInUserDto })
  async signIn(
    @Res() res: Response,
    @Body() body: SignInUserDto,
  ): Promise<void> {
    return this.authService.signIn(body, res);
  }

  @Get('/refresh')
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @ApiOkResponse({ type: RefreshedSessionDto })
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshSession(req.cookies['refreshToken'], res);
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    this.authService.logout(req.cookies['refreshToken'], res);
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Throttle({ default: { limit: 2, ttl: 30 * 1000 } })
  // @Post('/request-sign-in-link')
  async requestSignInLink(
    @Body() body: RequestSignInLinkDto,
  ): Promise<SuccessMessageDto> {
    return this.authService.requestSignInLink(body);
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  // @Throttle({ default: { limit: 1, ttl: 30 * 1000 } })
  @Post('/request-sign-in-otp')
  async requestSignInOtp(
    @Body() body: RequestSignInLinkDto,
  ): Promise<SuccessMessageDto> {
    return this.authService.requestSignInOtp(body);
  }

  @ApiOkResponse({ type: SignedInUserDto })
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @Post('/sign-in-with-otp')
  async signInWithOtp(
    @Res() res: Response,
    @Body() body: VerifyOtpDto,
  ): Promise<void> {
    return this.authService.signInWithOtp(body, res);
  }

  @ApiOkResponse({ type: SignedInUserDto })
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @Post('/sign-in-with-token')
  async signInWithToken(
    @Res() res: Response,
    @Body() body: VerifyTokenDto,
  ): Promise<void> {
    return this.authService.signInWithToken(body, res);
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  // @Throttle({ default: { limit: 1, ttl: 30 * 1000 } })
  @Post('/forgot-password')
  async forgotPassword(
    @Body() body: ForgotPasswordDto,
  ): Promise<SuccessMessageDto> {
    return this.authService.forgotPassword(body);
  }

  @ApiOkResponse({ type: SignedInUserDto })
  // @Throttle({ default: { limit: 5, ttl: 30 * 1000 } })
  @Post('/reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.authService.resetPassword(body, res);
  }
}
