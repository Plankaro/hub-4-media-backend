import { ApiProperty } from '@nestjs/swagger';
import { BlockNoteContent } from '../types/block-note.types';

export class BlogResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  blocks?: BlockNoteContent[];

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class BlogListResponseDto {
  @ApiProperty({ type: [BlogResponseDto] })
  blogs: BlogResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
