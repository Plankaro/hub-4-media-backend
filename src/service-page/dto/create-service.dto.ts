import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ExtraServiceDto } from './extra-service.dto';
import { Type } from 'class-transformer';
import { ServiceLocationDto } from './location.dto';
import { ImageUploadDto } from 'src/common/dtos';
import { ServiceSeoDto } from './seo.dto';
import { TimeSlotsOfDayDto } from './time-slots.dto';
import { CreateServicePricingDto } from './pricing.dto';

export class CreateServiceDtos {
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



/**
 * DTO for creating a new service.
 */
export class CreateServiceDto {

  @ApiProperty({ description: 'Title of the service.', example: 'Haircut and Styling' })
  @IsString()
  @MaxLength(255)
  serviceTitle: string;

  @ApiProperty({ description: 'Pricing details for the service.', type: [CreateServicePricingDto] })
  @IsArray()
  @IsOptional()
  pricings?: CreateServicePricingDto[];


  @ApiProperty({ description: 'Description of the service.', example: 'A professional haircut and styling service for men and women.' })
  @IsString()
  description: string;


  @ApiProperty({ description: 'List of services included in the service package.', type: [String] })
  @IsArray()
  includeServices: string[];

  @ApiProperty({ description: 'URL for the service-related video (if available).', example: 'https://www.youtube.com/watch?v=xyz' })
  @IsString()
  videoUrl: string;

  @ApiProperty({ type: () => ServiceLocationDto })
  @ValidateNested()
  @Type(() => ServiceLocationDto)
  location: ServiceLocationDto;

  @ApiProperty({ type: () => ImageUploadDto })
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;

  @ApiProperty({ type: () => [ImageUploadDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageUploadDto)
  images: ImageUploadDto[];

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

  @ApiProperty({ type: () => ServiceSeoDto })
  @ValidateNested()
  @Type(() => ServiceSeoDto)
  seo: ServiceSeoDto;

  @ApiProperty({ description: 'Degree required for the service provider (if applicable).', required: false, example: 'Certified Barber' })
  @IsString()
  @IsOptional()
  degree?: string;

  @ApiProperty({ description: 'Institution where the degree was obtained (if applicable).', required: false, example: 'Barber College' })
  @IsString()
  @IsOptional()
  institution?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  subCategoryId: string;

}
