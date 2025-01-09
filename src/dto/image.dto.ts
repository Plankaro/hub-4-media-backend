import { IsNotEmpty, IsString } from 'class-validator';

export class Image {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}
