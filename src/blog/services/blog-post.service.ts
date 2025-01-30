import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostQueryValidatorDto, PostsListDto } from '../dtos';
import { BlogPost } from '../entities';
import { BlogCategoryService } from './blog-category.service';
import { getPaginationMeta } from '../../common/utility';
import { SortOrder } from '../../common/types';

import { ImageEntity } from 'src/common/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageUploadDto } from 'src/common/dtos';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreateBlogPostDto } from '../dtos/create-post.dto';
import { SuccessMessageDto } from 'src/common/dtos';
import { BlogListResponseDto } from '../dtos/blog-response.dto';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private postRepo: Repository<BlogPost>,
    private categoryService: BlogCategoryService,
    private cloudinaryService: CloudinaryService,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
  ) {}

  async createPost(createPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const { title, description, blocks } = createPostDto;

    const slug = this.generateUniqueSlug(title);

    const newPost = this.postRepo.create({
      title,
      description,
      blocks: blocks || [],
      slug,
    });

    return await this.postRepo.save(newPost);
  }

  async uploadImage(body: ImageUploadDto) {
    try {
      const imageUpload = (await this.cloudinaryService.uploadFiles(body))[0];
      const uploadedImage = await this.imageRepo.save({
        imageName: imageUpload.original_filename,
        imageUrl: imageUpload.url,
      });

      return uploadedImage;
    } catch (err) {
      console.log('Error uploading image', err);
      throw new InternalServerErrorException();
    }
  }

  async updatePost(
    postId: string,
    updateData: UpdatePostDto,
  ): Promise<BlogPost> {
    const post = await this.getPost(postId);

    if (updateData.title) {
      post.title = updateData.title;
      post.slug = this.generateUniqueSlug(updateData.title);
    }

    if (updateData.description) {
      post.description = updateData.description;
    }

    if (updateData.blocks) {
      post.blocks = updateData.blocks;
    }

    return await this.postRepo.save(post);
  }

  async getPost(postId: string): Promise<BlogPost> {
    const post = await this.postRepo.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  getPostsForPublic(body: PostQueryValidatorDto) {
    return this.getAllPosts(body);
  }

  async getAllPosts(body: PostQueryValidatorDto): Promise<PostsListDto> {
    const pageSize = body.pageSize || 10;
    const pageIndex = body.pageIndex || 0;
    const query = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .select(['post', 'category.id', 'category.name'])
      .skip(pageIndex * pageSize)
      .take(pageSize);

    // Common filters
    if (body.order) {
      query.orderBy('post.updatedAt', body.order);
    } else {
      query.orderBy('post.updatedAt', SortOrder.DESC);
    }

    if (body.title) {
      query.where('post.title ILIKE :title', { title: `%${body.title}%` });
    }

    if (body.categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId: body.categoryId,
      });
    }

    const [posts, totalItems] = await query.getManyAndCount();

    const paginationMeta = getPaginationMeta(
      { pageIndex, pageSize },
      { totalItems, itemsOnPage: posts.length },
    );

    return {
      posts,
      paginationMeta,
    };
  }

  async deletePost(postId: string): Promise<SuccessMessageDto> {
    await this.postRepo.softDelete({ id: postId });
    return { message: 'Successfully deleted blog post' };
  }

  async createUntitledPost(): Promise<BlogPost> {
    const title = 'Untitled';
    const description = 'Start writing your blog post...';
    const slug = this.generateUniqueSlug(title);

    const initialBlocks = [
      {
        children: [],
        content: [
          {
            styles: {},
            text: 'Create a new blog post here',
            type: 'text',
          },
        ],
        id: '5c86b533-1344-4e8b-b354-a4d335d85d5e',
        props: {
          backgroundColor: 'default',
          textAlignment: 'left',
          textColor: 'default',
        },
        type: 'paragraph',
      },
      {
        children: [],
        content: [
          {
            styles: {},
            text: 'Write Content Here, add / to add content as your need To store updated data',
            type: 'text',
          },
        ],
        id: 'b4cecdd1-cd72-4c20-b49f-v31fc75afef4',
        props: {
          backgroundColor: 'default',
          textAlignment: 'left',
          textColor: 'default',
        },
        type: 'paragraph',
      },
      {
        children: [],
        content: [
          {
            styles: {},
            text: 'Hi Hello',
            type: 'text',
          },
        ],
        id: '6f248acc-109b-4273-b678-f634d540d0b0',
        props: {
          backgroundColor: 'default',
          level: 1,
          textAlignment: 'left',
          textColor: 'default',
        },
        type: 'heading',
      },
    ];

    const newPost = this.postRepo.create({
      title,
      description,
      blocks: initialBlocks,
      slug,
    });

    return await this.postRepo.save(newPost);
  }

  private generateUniqueSlug(title: string): string {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return `${baseSlug}-${Date.now()}`;
  }

  async getAllBlogs({
    page = 1,
    limit = 10,
    search,
  }: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<BlogListResponseDto> {
    const query = this.postRepo
      .createQueryBuilder('blog')
      .orderBy('blog.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      query.where(
        'blog.title ILIKE :search OR blog.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    const [blogs, total] = await query.getManyAndCount();

    return {
      blogs,
      total,
      page,
      limit,
    };
  }
}
