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
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { BlogPost } from '../entities';
// import { AbilityGuard } from '../../ability/ability.guard';
// import { CheckAbilities } from '../../ability/ability.decorator';
// import { Action } from '../../ability/ability.factory';
import { ImageUploadDto, SuccessMessageDto } from 'src/common/dtos';
import { ImageEntity } from 'src/common/entities';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreateBlogPostDto } from '../dtos/create-post.dto';
import { BlogListResponseDto } from '../dtos/blog-response.dto';

@Controller('blog-post')
export class BlogPostController {
  constructor(private postService: BlogPostService) {}

  @Post()
  @ApiOkResponse({ type: BlogPost })
  createPost(@Body() createPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.postService.createPost(createPostDto);
  }

  @Post('/upload')
  @ApiOkResponse({ type: ImageEntity })
  uploadImage(@Body() body: ImageUploadDto): Promise<ImageEntity> {
    return this.postService.uploadImage(body);
  }

  @Put('/:postId')
  // @UseGuards(AuthGuard(), AbilityGuard)
  @ApiOkResponse({ type: BlogPost })
  // @CheckAbilities({ action: Action.Update, subject: BlogPost })
  async updatePost(
    @Param('postId') postId: string,
    @Body() updateData: UpdatePostDto,
  ): Promise<BlogPost> {
    return this.postService.updatePost(postId, updateData);
  }

  @Get('/:postId')
  @ApiOkResponse({ type: BlogPost })
  getPost(@Param('postId') postId: string): Promise<BlogPost> {
    return this.postService.getPost(postId);
  }

  @Delete('/:postId')
  // @UseGuards(AuthGuard(), AbilityGuard)
  @ApiOkResponse({ type: SuccessMessageDto })
  // @CheckAbilities({ action: Action.Create, subject: BlogPost })
  deletePost(@Param('postId') postId: string): Promise<SuccessMessageDto> {
    return this.postService.deletePost(postId);
  }

  @Post('/create-untitled')
  @ApiOkResponse({ type: BlogPost })
  async createUntitledPost(): Promise<BlogPost> {
    return this.postService.createUntitledPost();
  }

  @Get()
  @ApiOkResponse({ type: BlogListResponseDto })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAllBlogs(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ): Promise<BlogListResponseDto> {
    return this.postService.getAllBlogs({ page, limit, search });
  }
}
