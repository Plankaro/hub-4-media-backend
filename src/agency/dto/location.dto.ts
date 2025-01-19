import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({ description: 'City where the agency is located' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Country of the agency' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'State where the agency is located',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Agency Address Line 1' })
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @ApiProperty({ description: 'Agency Address Line 2', required: false })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiProperty({ description: 'Agency Postal Code', required: false })
  @IsOptional()
  @IsString()
  postalCode?: string;
}
