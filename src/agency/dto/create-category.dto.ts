import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

export class CreateAgencyCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value as string).trim().toLowerCase())
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: () => ImageUploadDto })
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;

  @ApiProperty({ required: true })
  @IsBoolean()
  isFeatured: boolean;
}

export class UpdateAgencyCategoryDto extends PartialType(
  CreateAgencyCategoryDto,
) {}
