import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceCategoryDto, UpdateCategoryDto } from '../dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from 'src/common/entities';
import { Repository } from 'typeorm';
import { ServiceCategory } from '../entities';
import { SuccessMessageDto } from 'src/common/dtos';

@Injectable()
export class ServiceCategoryService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
    @InjectRepository(ServiceCategory)
    private categoryRepo: Repository<ServiceCategory>,
  ) { }

  async create({
    title,
    description,
    image,
    isFeatured,
  }: CreateServiceCategoryDto): Promise<ServiceCategory> {
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

    const category = this.categoryRepo.create({
      title,
      description,
      image: uploadedImage,
      isFeatured,
    });

    return this.categoryRepo.save(category);
  }

  async update(
    id: string,
    { title, description, image, isFeatured }: UpdateCategoryDto,
  ): Promise<ServiceCategory> {
    const existingCategory = await this.categoryRepo.findOne({ where: { id } });
    if (existingCategory) {
      throw new NotFoundException(`Category not found with Id: ${id}`);
    }

    let uploadedImage: ImageEntity;
    if (image) {
      try {
        const imageUpload = (
          await this.cloudinaryService.uploadFiles(image)
        )[0];
        uploadedImage = await this.imageRepo.save({
          imageName: imageUpload.original_filename,
          imageUrl: imageUpload.url,
        });
      } catch (error) {
        console.log(`Error uploading category image: `, error);
        throw new InternalServerErrorException();
      }
    }

    if (image) {
      existingCategory.image = uploadedImage;
    }
    if (title) {
      existingCategory.title = title;
    }

    if (description) {
      existingCategory.description = description;
    }

    if (isFeatured) {
      existingCategory.isFeatured = isFeatured;
    }

    return this.categoryRepo.save(existingCategory);
  }

  async getById(id: string): Promise<ServiceCategory> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['image', 'subCategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category not found with id: ${id}`);
    }
    return category;
  }

  getAllCategories(): Promise<ServiceCategory[]> {
    return this.categoryRepo.find({
      relations: ['image', 'subCategories'],
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
