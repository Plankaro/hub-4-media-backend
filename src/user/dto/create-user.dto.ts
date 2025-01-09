import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { RoleType } from '@prisma/client';
import { Image } from '../../dto/image.dto';
import { Transform, Type } from 'class-transformer';

export class UpsertUserParamRoleDto {
  @IsEnum(RoleType)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  role: RoleType;
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsMobilePhone('en-IN', {}, { message: 'Mobile Number is not valid' })
  @IsString()
  @Type(() => String)
  @IsOptional()
  mobileNumber?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  @IsNotEmpty()
  image?: Image;

  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password is too weak',
    },
  )
  @IsString()
  @IsNotEmpty()
  password: string;
}
