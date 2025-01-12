import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: () => ImageUploadDto })
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isFeatured: boolean;
}
