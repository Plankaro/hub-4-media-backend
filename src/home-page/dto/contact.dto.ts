import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ContactDto {
  @ApiProperty()
  @IsString()
  phonNumber: string;

  @ApiProperty()
  @IsString()
  extraPhonNumber?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEmail()
  extraEmail?: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  googelMapLocation?: string;

  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty()
  @IsString()
  imgPublicID: string;
}
