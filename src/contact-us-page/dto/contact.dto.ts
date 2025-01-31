import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

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

  @ApiProperty({ type: ImageUploadDto })
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
