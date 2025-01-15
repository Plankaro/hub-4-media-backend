import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ type: ImageUploadDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
