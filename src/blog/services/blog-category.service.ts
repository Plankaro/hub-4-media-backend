import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCategory } from '../entities';
import { CreateCategoryDto } from '../dtos';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectRepository(BlogCategory)
    private categoryRepo: Repository<BlogCategory>,
  ) {}

  async createCategory({ categoryName, description }: CreateCategoryDto) {
    await this.isCategoryUnique(categoryName);

    const newCategory = this.categoryRepo.create({
      name: categoryName,
      description: description,
    });

    const category = await this.categoryRepo.save(newCategory);
    return category;
  }

  async isCategoryUnique(categoryName: string): Promise<void> {
    const category = await this.categoryRepo.findOne({
      where: { name: categoryName },
    });

    if (category) {
      throw new BadRequestException(
        `A category already exists for the given categoryName = ${categoryName}`,
      );
    }
  }

  async updateCategory(
    categoryId: string,
    { categoryName, description }: CreateCategoryDto,
  ) {
    const { category } = await this.findCategory(categoryId);

    if (category.name !== categoryName) {
      await this.isCategoryUnique(categoryName);
      category.name = categoryName;
    }

    category.description = description;

    const updatedCategory = await this.categoryRepo.save(category);
    return updatedCategory;
  }

  async findCategory(categoryId: string) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `No category found for categoryId = ${categoryId}`,
      );
    }
    return { category };
  }

  async getAllCategories() {
    const getAllCategories = this.categoryRepo.find();
    return getAllCategories;
  }

  async deleteCategory(categoryId: string) {
    await this.categoryRepo.softDelete({ id: categoryId });
    return { message: 'Successfully deleted category' };
  }
}
