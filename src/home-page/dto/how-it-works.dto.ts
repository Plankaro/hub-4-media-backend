import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HowItWorksDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
