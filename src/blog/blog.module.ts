import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory, BlogPost } from './entities';
import { BlogPostController } from './controllers/blog-post.controller';
import { BlogCategoryService, BlogPostService } from './services';
import { AbilityModule } from '../ability/ability.module';
import { BlogCategoryController } from './controllers';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ImageEntity } from 'src/common/entities';

@Module({
  imports: [
    AuthModule,
    AbilityModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([BlogPost, BlogCategory, ImageEntity]),
  ],
  controllers: [BlogPostController, BlogCategoryController],
  providers: [BlogPostService, BlogCategoryService],
  exports: [],
})
export class BlogModule {}
