import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ImageUploadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  imageName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data: string;
}
