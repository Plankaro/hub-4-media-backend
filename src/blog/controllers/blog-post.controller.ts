import {
  Body,
  Controller,
  // UseGuards,
  Post,
  Get,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { BlogPostService } from '../services';
import {
  CreatePostDto,
  PostQueryDto,
  PostQueryValidatorDto,
  PostsListDto,
} from '../dtos';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { BlogPost } from '../entities';
// import { AbilityGuard } from '../../ability/ability.guard';
// import { CheckAbilities } from '../../ability/ability.decorator';
// import { Action } from '../../ability/ability.factory';
import { SuccessMessageDto } from 'src/common/dtos';

@Controller('blog-post')
export class BlogPostController {
  constructor(private postService: BlogPostService) {}

  @Post('/create')
  // @UseGuards(AuthGuard(), AbilityGuard)
  @ApiOkResponse({ type: BlogPost })
  // @CheckAbilities({ action: Action.Create, subject: BlogPost })
  createPost(@Body() body: CreatePostDto): Promise<BlogPost> {
    return this.postService.createPost(body);
  }

  @Put('/:postId')
  // @UseGuards(AuthGuard(), AbilityGuard)
  @ApiOkResponse({ type: BlogPost })
  // @CheckAbilities({ action: Action.Update, subject: BlogPost })
  async updatePost(
    @Param('postId') postId: string,
    @Body() body: CreatePostDto,
  ): Promise<BlogPost> {
    const updatedPost = await this.postService.updatePost(postId, body);
    return updatedPost;
  }

  @Get('/:postId')
  @ApiOkResponse({ type: BlogPost })
  getPost(@Param('postId') postId: string): Promise<BlogPost> {
    return this.postService.getPost(postId);
  }

  @Get('/')
  @ApiOkResponse({ type: PostsListDto })
  @ApiQuery({
    type: () => PostQueryDto,
  })
  getAllBlogPosts(
    @Query() query: PostQueryValidatorDto,
  ): Promise<PostsListDto> {
    return this.postService.getPostsForPublic(query);
  }

  @Delete('/:postId')
  // @UseGuards(AuthGuard(), AbilityGuard)
  @ApiOkResponse({ type: SuccessMessageDto })
  // @CheckAbilities({ action: Action.Create, subject: BlogPost })
  deletePost(@Param('postId') postId: string): Promise<SuccessMessageDto> {
    return this.postService.deletePost(postId);
  }
}
