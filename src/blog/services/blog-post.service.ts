import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, PostQueryValidatorDto, PostsListDto } from '../dtos';
import { BlogPost } from '../entities';
import { BlogCategoryService } from './blog-category.service';
import { cleanHtmlData, getPaginationMeta } from '../../common/utility';
import { SortOrder } from '../../common/types';

import { ImageEntity } from 'src/common/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private postRepo: Repository<BlogPost>,
    private categoryService: BlogCategoryService,
    private cloudinaryService: CloudinaryService,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
  ) {}

  async createPost({
    intro,
    summary,

    title,
    content,
    categoryId,

    image,
  }: CreatePostDto) {
    const { category } = await this.categoryService.findCategory(categoryId);

    const cleanedContent = cleanHtmlData(content);

    let uploadedImage: ImageEntity;
    try {
      console.log('Image from category,', image);
      const imageUpload = (await this.cloudinaryService.uploadFiles(image))[0];
      uploadedImage = await this.imageRepo.save({
        imageName: imageUpload.original_filename,
        imageUrl: imageUpload.url,
      });
    } catch (error) {
      console.log(`Error uploading category image: `, error);
      throw new InternalServerErrorException();
    }

    const newPost = this.postRepo.create({
      title,
      intro,
      content: cleanedContent,
      summary,
      category,
      image: uploadedImage,
    });

    const post = await this.postRepo.save(newPost);

    return post;
  }

  async updatePost(
    postId: string,
    { intro, summary, title, content, categoryId, image }: CreatePostDto,
  ) {
    const post = await this.getPost(postId);

    let uploadedImage: ImageEntity;
    try {
      console.log('Image from category,', image);
      const imageUpload = (await this.cloudinaryService.uploadFiles(image))[0];
      uploadedImage = await this.imageRepo.save({
        imageName: imageUpload.original_filename,
        imageUrl: imageUpload.url,
      });
    } catch (error) {
      console.log(`Error uploading category image: `, error);
      throw new InternalServerErrorException();
    }

    const { category } = await this.categoryService.findCategory(categoryId);

    const cleanedContent = cleanHtmlData(content);

    post.intro = intro;
    post.summary = summary;
    post.title = title;
    post.content = cleanedContent;
    post.category = category;
    post.image = uploadedImage;

    return await this.postRepo.save(post);
  }

  async getPost(postId: string) {
    const post = await this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.tags', 'tags')
      .select(['post'])
      .where('post.id = :postId', { postId })
      .getOne();

    if (!post) {
      throw new NotFoundException('No Post found for the given id');
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

  async deletePost(postId: string) {
    await this.postRepo.softDelete({ id: postId });
    return { message: 'Successfully deleted blog post' };
  }
}
