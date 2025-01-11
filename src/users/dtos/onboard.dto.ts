import { IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnboardDto {
  @ApiProperty({ required: false })
  @IsStrongPassword()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  timezone: string;
}
