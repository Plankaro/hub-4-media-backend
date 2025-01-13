import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OfferHeadingsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subheading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
