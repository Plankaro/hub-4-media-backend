import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class ServiceLocationDto {


  @ApiProperty({ description: 'Address where the service is provided.', required: false, example: '123 Main St, Springfield' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Country where the service is provided.', required: false, example: 'USA' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ description: 'City where the service is provided.', required: false, example: 'Springfield' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'State where the service is provided.', required: false, example: 'Illinois' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ description: 'Pincode/ZIP code for the service location.', required: false, example: 62701 })
  @IsNumber()
  @IsOptional()
  pincode?: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  googleMapLink: string;

  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // googleMapPlaceId: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsLatitude()
  // latitude: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsLongitude()
  // longitude: string;
}
