import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessMessageDto } from 'src/common/dtos';
import { Repository } from 'typeorm';
import { AgencyCategoryService } from './category.service';
import { AgencySubCategory } from './entities/sub-category';
import { CreateAgencySubCategoryDto } from './dto/create-sub-category.dto';

@Injectable()
export class AgencySubCategoryService {
  constructor(
    @InjectRepository(AgencySubCategory)
    private readonly subCategoryRepo: Repository<AgencySubCategory>,
    private readonly catgeoryService: AgencyCategoryService,
  ) {}

  async create({
    categoryId,
    title,
  }: CreateAgencySubCategoryDto): Promise<AgencySubCategory> {
    const category = await this.catgeoryService.getById(categoryId);
    const subCategory = this.subCategoryRepo.create({
      title,
      category,
    });

    return this.subCategoryRepo.save(subCategory);
  }

  async update(
    id: string,
    { categoryId, title }: CreateAgencySubCategoryDto,
  ): Promise<AgencySubCategory> {
    const existingSubCategory = await this.subCategoryRepo.findOne({
      where: { id },
    });
    if (!existingSubCategory) {
      throw new NotFoundException(`Sub category not found with Id: ${id}`);
    }

    const category = await this.catgeoryService.getById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category not found with Id: ${categoryId}`);
    }

    const isAlreadyExist = category.subCategories.find(
      (subCategory) => subCategory.id === existingSubCategory.id,
    );

    if (isAlreadyExist) {
      throw new ConflictException(
        `Sub category already exists in category with id: ${categoryId}`,
      );
    }

    // if (title) {
    //   const isTitleAlreadyExist = await this.subCategoryRepo.findOne({
    //     where: { title },
    //   });

    //   if (isTitleAlreadyExist && isTitleAlreadyExist.id !== id) {
    //     throw new InternalServerErrorException(
    //       `Subcategory with title "${title}" already exists`,
    //     );
    //   }
    // }

    existingSubCategory.title = title;
    existingSubCategory.category = category;

    return this.subCategoryRepo.save(existingSubCategory);
  }

  async getById(id: string): Promise<AgencySubCategory> {
    const category = await this.subCategoryRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!category) {
      throw new NotFoundException(`Sub category not found with id: ${id}`);
    }
    return category;
  }

  getAllSubCategories(): Promise<AgencySubCategory[]> {
    return this.subCategoryRepo.find({ relations: ['category'] });
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
