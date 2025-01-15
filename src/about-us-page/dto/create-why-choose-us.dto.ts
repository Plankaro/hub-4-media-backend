import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

export class WhyChooseUsCardsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateWhyChooseUsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: ImageUploadDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;

  @ApiProperty({ type: [WhyChooseUsCardsDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhyChooseUsCardsDto)
  cards: WhyChooseUsCardsDto[];
}
