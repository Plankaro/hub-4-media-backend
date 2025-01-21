import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessMessageDto } from 'src/common/dtos';
import { Repository } from 'typeorm';
import { AgencyCategory } from './entities/category.entity';
import {
  CreateAgencyCategoryDto,
  UpdateAgencyCategoryDto,
} from './dto/create-category.dto';

@Injectable()
export class AgencyCategoryService {
  constructor(
    @InjectRepository(AgencyCategory)
    private readonly categoryRepo: Repository<AgencyCategory>,
  ) {}

  async create({
    title,
    description,
    isFeatured,
  }: CreateAgencyCategoryDto): Promise<AgencyCategory> {
    const category = this.categoryRepo.create({
      title,
      description,
      isFeatured,
    });

    return this.categoryRepo.save(category);
  }

  async update(
    id: string,
    { title, description }: UpdateAgencyCategoryDto,
  ): Promise<AgencyCategory> {
    const existingCategory = await this.categoryRepo.findOne({ where: { id } });
    if (existingCategory) {
      throw new NotFoundException(`Category not found with Id: ${id}`);
    }

    if (title) {
      existingCategory.title = title;
    }

    if (description) {
      existingCategory.description = description;
    }

    return this.categoryRepo.save(existingCategory);
  }

  async getById(id: string): Promise<AgencyCategory> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['subCategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category not found with id: ${id}`);
    }
    return category;
  }

  getAllCategories(): Promise<AgencyCategory[]> {
    return this.categoryRepo.find({
      relations: ['subCategories'],
    });
  }

  async delete(id: string): Promise<SuccessMessageDto> {
    try {
      const result = await this.categoryRepo.softDelete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
    } catch (error) {
      console.error(`Error while deleting category with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to delete the category');
    }

    return { message: 'Category deleted successfully' };
  }
}
