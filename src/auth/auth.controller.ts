import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { signUpDto } from './dto/signup.dto';
import { loginDto, loginOtpDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { SkipJwt } from './decorators/skip-jwt.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipJwt()  
  @Get('isAuth')
  async isAuth(@Req() req: Request, @Res() res: Response) {
    const jwt = req.cookies['jwt'];

  

    const isAuthenticated = await this.authService.checkAuth(jwt);

    return res.json({ isAuth: isAuthenticated });
  }
  @SkipJwt()
  @Post('signup')
  signup(@Body() signUpDto: signUpDto) {
    return this.authService.signup(signUpDto);
  }
  @SkipJwt()
  @Post('login')
  login(@Body() loginDto: loginDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }


  @SkipJwt()
  @Post('logout')
  logout(@Res() res: Response) {
   return this.authService.logoutUser(res);

   
  }
  @SkipJwt()
  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return this.authService.sendOtp(email);
  }
  @SkipJwt()
  @Post('login-otp')
  async loginWithOtp(@Body() loginOtpDto: loginOtpDto,@Res() res: Response) {
    return this.authService.loginWithOtp(loginOtpDto,res);
  }
  @SkipJwt()
  @Post('forget-password')
  async forgetPassword(@Body('email') email: string) {
    return this.authService.forgetPassword(email);
  }
  @SkipJwt()
  // Step 2: Verify OTP and reset the password
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, otp, newPassword);
  }
}
