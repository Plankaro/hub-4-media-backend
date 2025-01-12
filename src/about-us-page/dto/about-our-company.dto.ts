import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

export class AboutOurCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descriptionOne: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descriptionTwo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sideText: string;

  @ApiProperty({ type: ImageUploadDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
