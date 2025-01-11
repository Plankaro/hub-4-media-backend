import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SectionHeadingDto {
  @ApiProperty()
  @IsString()
  sectionName?: string;

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
