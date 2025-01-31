import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ImageUploadDto } from 'src/common/dtos';

export class HowItWorksDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: ImageUploadDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
