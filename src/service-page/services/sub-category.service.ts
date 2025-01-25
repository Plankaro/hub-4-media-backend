import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceSubCategory } from '../entities';
import { SuccessMessageDto } from 'src/common/dtos';
import { CreateSubCategoryDto } from '../dto';
import { ServiceCategoryService } from './category.service';

@Injectable()
export class ServiceSubCategoryService {
  constructor(
    @InjectRepository(ServiceSubCategory)
    private subCategoryRepo: Repository<ServiceSubCategory>,
    private catgeoryService: ServiceCategoryService,
  ) {}

  async create({
    categoryId,
    title,
  }: CreateSubCategoryDto): Promise<ServiceSubCategory> {
    const category = await this.catgeoryService.getById(categoryId);
    const subCategory = this.subCategoryRepo.create({
      title,
      category,
    });

    return this.subCategoryRepo.save(subCategory);
  }

  async update(
    id: string,
    { categoryId, title }: CreateSubCategoryDto,
  ): Promise<ServiceSubCategory> {
    const existingCategory = await this.subCategoryRepo.findOne({
      where: { id },
    });
    if (existingCategory) {
      throw new NotFoundException(`Sub category not found with Id: ${id}`);
    }
    const category = await this.catgeoryService.getById(categoryId);

    if (!category) {
      throw new NotFoundException(`Category not found with Id: ${categoryId}`);
    }

    existingCategory.title = title;
    existingCategory.category = category;

    return this.subCategoryRepo.save(existingCategory);
  }

  async getById(id: string): Promise<ServiceSubCategory> {
    const category = await this.subCategoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Sub category not found with id: ${id}`);
    }
    return category;
  }

  getAllSubCategories(): Promise<ServiceSubCategory[]> {
    return this.subCategoryRepo.find();
  }

  async delete(id: string): Promise<SuccessMessageDto> {
    try {
      const result = await this.subCategoryRepo.softDelete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Sub category with id ${id} not found`);
      }
    } catch (error) {
      console.error(`Error while deleting subb category with id: ${id}`, error);
      throw new InternalServerErrorException(
        'Failed to delete the sub category',
      );
    }

    return { message: 'Sub category deleted successfully' };
  }
}
