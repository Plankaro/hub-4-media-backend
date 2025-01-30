import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ValidateIfNonEmpty } from '../../common/validators';
import { ImageUploadDto } from 'src/common/dtos';
import { BlockNoteContent } from '../types/block-note.types';

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

export class CreateBlogPostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the post' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Content blocks of the post',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        type: { type: 'string' },
        props: { type: 'object' },
        content: { type: 'array', items: { type: 'object' } },
        children: { type: 'array' },
      },
    },
    required: false,
  })
  @IsArray()
  @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => BlockNoteContent)
  blocks?: BlockNoteContent[];
}
