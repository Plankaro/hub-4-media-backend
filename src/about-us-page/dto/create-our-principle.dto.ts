import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { ImageUploadDto } from 'src/common/dtos';

export class CreateOurPrincipleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: ImageUploadDto })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ImageUploadDto)
  image: ImageUploadDto;
}
