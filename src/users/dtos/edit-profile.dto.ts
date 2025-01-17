import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditProfileDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  timezone: string;

  @ApiProperty()
  @IsString()
  languages: string[];
}
