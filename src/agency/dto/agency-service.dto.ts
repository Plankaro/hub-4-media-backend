import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgencyServiceDto {
  @ApiProperty({ description: 'Name of the service' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the service' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Key features of the service' })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  keyFeatures: string[];

  @ApiProperty({ description: 'Video URL of the service' })
  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;
}
