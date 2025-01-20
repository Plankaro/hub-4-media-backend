import {
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from './contact.dto';
import { SocialDto } from './social.dto';
import { LocationDto } from './location.dto';
import { TimeslotDto } from './timeslot.dto';
import { Type } from 'class-transformer';
import { CreateAgencyServiceDto } from './agency-service.dto';

export class CreateAgencyDto {
  @ApiProperty({ description: 'Name of the agency' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Slug used for the agency URL' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ description: 'Agency website URL', required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ description: 'Contact information of the agency' })
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ApiProperty({ description: 'Social media links of the agency' })
  @ValidateNested()
  @Type(() => SocialDto)
  social: SocialDto;

  @ApiProperty({ description: 'Location information of the agency' })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({ description: 'Agency services' })
  @ValidateNested()
  @Type(() => CreateAgencyServiceDto)
  agencyService: CreateAgencyServiceDto[];

  @ApiProperty({ description: 'Agency description or tagline' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'URL to the agency’s logo or profile picture',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  pictureUrl?: string;

  @ApiProperty({
    description: 'Agency status (active or inactive)',
    default: 'ACTIVE',
  })
  @IsOptional()
  @IsString()
  status: string = 'ACTIVE';

  @ApiProperty({ description: 'Available services of the agency' })
  @IsArray()
  availableServices: string[];

  @ApiProperty({ description: 'youtube video url' })
  @IsOptional()
  @IsString()
  videoUrl: string;

  @ApiProperty({ description: 'Verified status of the agency', default: false })
  @IsOptional()
  @IsBoolean()
  verified: boolean = false;

  @ApiProperty({
    description: 'The date the agency was featured',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  featured: boolean = false;

  @ApiProperty({
    description: 'The list of timeslots for the agency',
    required: false,
  })
  @IsOptional()
  @IsArray()
  timeSlots?: TimeslotDto[];
}
