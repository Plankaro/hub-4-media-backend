import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ExtraServiceDto } from './extra-service.dto';
import { Type } from 'class-transformer';
import { ServiceLocationDto } from './location.dto';
import { ImageUploadDto } from 'src/common/dtos';
import { ServiceSeoDto } from './seo.dto';
import { TimeSlotsOfDayDto } from './time-slots.dto';

export class CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  serviceTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  subCategoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsCurrency()
  currency?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: () => [ExtraServiceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExtraServiceDto)
  extraServices: ExtraServiceDto[];

  @ApiProperty({ type: () => [TimeSlotsOfDayDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotsOfDayDto)
  availability: TimeSlotsOfDayDto[];

  @ApiProperty({ type: () => ServiceLocationDto })
  @ValidateNested()
  @Type(() => ServiceLocationDto)
  location: ServiceLocationDto;

  @ApiProperty({ type: () => [ImageUploadDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageUploadDto)
  images: ImageUploadDto[];

  @ApiProperty({ type: () => ServiceSeoDto })
  @ValidateNested()
  @Type(() => ServiceSeoDto)
  seo: ServiceSeoDto;
}
