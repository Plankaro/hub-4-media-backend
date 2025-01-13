import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

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

  @ApiProperty({ type: ImageUploadDto })
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
