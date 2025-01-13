import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class HeroHeadingsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstHeading: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  secondHeading: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  thirdHeading: string;
}
