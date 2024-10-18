import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}


export class loginOtpDto{
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @MinLength(6)
  readonly otp: string;
}
