import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ServiceSeoDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  keywords: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
