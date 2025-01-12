import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ServiceLocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pincode: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googleMapPlaceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsLatitude()
  latitude: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsLongitude()
  longitude: string;
}
