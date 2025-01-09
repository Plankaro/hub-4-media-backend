import {
  IsEmail,
  IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  IsDate,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Image } from '../../dto/image.dto';
import { Type } from 'class-transformer';
import { EmploymentStatusType } from '@prisma/client';

export class UpdateProjectDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Invalid URL format' })
  link?: string;
}
export class CreateProjectDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl({}, { message: 'Invalid URL format' })
  link: string;
}

export class UpdateExperienceDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  jobType?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  joinDate?: string;

  @IsOptional()
  endDate?: string;

  @IsOptional()
  isPresent?: boolean;
}

export class CreateExperienceDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  jobType: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  joinDate: string;

  @IsOptional()
  endDate?: string;

  @IsOptional()
  isPresent?: boolean;
}

export class UpdateUserDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  @IsString()
  firstName?: string;
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  bio?: string;
  @IsOptional()
  @IsString()
  linkedin?: string;
  @IsOptional()
  @IsString()
  facebook?: string;
  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsMobilePhone('en-IN', {}, { message: 'Mobile Number is not valid' })
  @IsString()
  @Type(() => String)
  mobileNumber?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image?: Image;

  @ValidateNested()
  @Type(() => UpdateProjectDto)
  project?: UpdateProjectDto;

  @ValidateNested()
  @Type(() => UpdateExperienceDto)
  experience?: UpdateExperienceDto;
}
