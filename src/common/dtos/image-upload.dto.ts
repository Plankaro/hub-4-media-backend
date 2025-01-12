import { IsNotEmpty, IsString } from 'class-validator';

export class ImageUploadDto {
  @IsString()
  @IsNotEmpty()
  imageName: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}
