import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class HeroHeadingsDto {
  @ApiProperty()
  @IsString()
  firstHeading: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  secondHeading: string[];

  @ApiProperty()
  @IsString()
  thirdHeading: string;
}
