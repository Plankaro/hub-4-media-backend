import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class BlockNoteContent {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty({ type: Object })
  @IsObject()
  props: {
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: string;
    name?: string;
    url?: string;
    caption?: string;
    showPreview?: boolean;
    previewWidth?: number;
  };

  @ApiProperty({ type: [Object], required: false })
  @IsOptional()
  @IsArray()
  content?: Array<{
    type: string;
    text?: string;
    styles?: Record<string, any>;
  }>;

  @ApiProperty({ type: [Object] })
  @IsArray()
  children: any[];
}

export class UpdatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Description of the post' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Content blocks of the post',
    type: [BlockNoteContent],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BlockNoteContent)
  blocks?: BlockNoteContent[];
}
