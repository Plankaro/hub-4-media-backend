import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
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

  @ApiProperty({ type: ImageUploadDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => WhyChooseUsCardsDto)
  cards: WhyChooseUsCardsDto[];
}
