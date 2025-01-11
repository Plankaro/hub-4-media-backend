import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class PricePlanDto {
  @ApiProperty()
  @IsString()
  plan: string;

  @ApiProperty()
  @IsString()
  heading: string;

  @ApiProperty()
  @IsString()
  line: string;

  @ApiProperty()
  @IsBoolean()
  free: boolean;

  @ApiProperty()
  @IsString()
  slogan: string;

  @ApiProperty()
  @IsNumber()
  amount?: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  services: string[];
}
