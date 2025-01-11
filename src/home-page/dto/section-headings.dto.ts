import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { SectionName } from '../types/section-name.enum';

export class SectionHeadingDto {
  @ApiProperty({ enum: SectionName, enumName: 'SectionName' })
  @IsEnum(SectionName)
  sectionName: SectionName;

  @ApiProperty()
  @IsString()
  heading: string;

  @ApiProperty()
  @IsString()
  subheading?: string;
}

export class updateSectionHeadingsDto {
  @ApiProperty()
  @IsString()
  heading: string;

  @ApiProperty()
  @IsString()
  subheading?: string;
}
