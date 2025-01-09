import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SignInDto {

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  username: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  password: string;
}
