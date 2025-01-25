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
import { ImageEntity } from 'src/common/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AgencyCategoryService {
  constructor(
    @InjectRepository(AgencyCategory)
    private readonly categoryRepo: Repository<AgencyCategory>,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create({
    title,
    description,
    image,
    isFeatured,
  }: CreateAgencyCategoryDto): Promise<AgencyCategory> {
    let uploadedImage: ImageEntity;
    try {
      // console.log('data: ,', title, description, image, isFeatured);
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
    { title, description, image, isFeatured }: UpdateAgencyCategoryDto,
  ): Promise<AgencyCategory> {
    console.log('Image from category,', image, title, description, isFeatured);
    const existingCategory = await this.categoryRepo.findOne({ where: { id } });
    if (!existingCategory) {
      throw new NotFoundException(`Category not found with Id : ${id}`);
    }

    if (title) {
      // const isTitleExist = await this.categoryRepo.findOne({
      //   where: { title },
      // });
      // if (isTitleExist && isTitleExist.id !== id) {
      //   throw new InternalServerErrorException(
      //     'Category with this title already exists',
      //   );
      // }
      existingCategory.title = title;
    }

    if (image) {
      const imageUpload = (await this.cloudinaryService.uploadFiles(image))[0];
      const uploadedImage = await this.imageRepo.save({
        imageName: imageUpload.original_filename,
        imageUrl: imageUpload.url,
      });
      existingCategory.image = uploadedImage;
    }

    if (description) {
      existingCategory.description = description;
    }

    return this.categoryRepo.save(existingCategory);
  }

  async getById(id: string): Promise<AgencyCategory> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['subCategories', 'image'],
    });
    if (!category) {
      throw new NotFoundException(`Category not found with id: ${id}`);
    }
    return category;
  }

  getAllCategories(): Promise<AgencyCategory[]> {
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
