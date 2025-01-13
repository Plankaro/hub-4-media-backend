import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { ValidateIfNonEmpty } from '../../common/validators';
import { ImageUploadDto } from 'src/common/dtos';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  title: string;

  @ApiProperty()
  @IsString()
  intro: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsString()
  @ValidateIfNonEmpty()
  summary?: string;

  @ApiProperty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({ type: ImageUploadDto })
  @ValidateNested()
  @Type(() => ImageUploadDto)
  @ValidateIfNonEmpty()
  image?: ImageUploadDto;
}
