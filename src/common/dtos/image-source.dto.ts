import { ApiProperty } from '@nestjs/swagger';

export class ImageSourceDto {
  @ApiProperty()
  imageName: string;

  @ApiProperty()
  ImageUrl: string;
}
