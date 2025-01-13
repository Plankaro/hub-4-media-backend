import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SectionName } from '../types/section-name.enum';

export class SectionHeadingDto {
  @ApiProperty({ enum: SectionName, enumName: 'SectionName' })
  @IsEnum(SectionName)
  @IsNotEmpty()
  sectionName: SectionName;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subheading?: string;
}

export class updateSectionHeadingsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subheading?: string;
}
