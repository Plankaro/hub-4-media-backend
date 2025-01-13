import { ApiProperty } from '@nestjs/swagger';
import { PaginationResultDto } from '../../common/dtos';
import { BlogPost } from '../entities';

export class PostsListDto {
  @ApiProperty({ type: [BlogPost] })
  posts: BlogPost[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
