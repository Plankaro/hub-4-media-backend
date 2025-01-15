import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  AboutOurCompanyDto,
  CreateOurPrincipleDto,
  CreateTestimonialDto,
  CreateWhyChooseUsDto,
  UpdateOurPrincipleDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutOurCompany } from './entities/about-our-company.entity';
import { OurThreePrinciples } from './entities/our-three-principles.entity';
import { ImageEntity } from 'src/common/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SuccessMessageDto } from 'src/common/dtos';
import { Testimonials } from './entities/testimonials.entity';
import { WhyChooseUs } from './entities/why-choose-us.entity';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class AboutUsPageService {
  constructor(
    @InjectRepository(AboutOurCompany)
    private aboutOurCompanyRepo: Repository<AboutOurCompany>,
    @InjectRepository(OurThreePrinciples)
    private ourPrincipleRepo: Repository<OurThreePrinciples>,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
    @InjectRepository(Testimonials)
    private testiMonialsRepo: Repository<Testimonials>,
    @InjectRepository(WhyChooseUs)
    private chooseUsRepo: Repository<WhyChooseUs>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createAboutOurCompany({
    heading,
    descriptionOne,
    descriptionTwo,
    sideText,
    image,
  }: AboutOurCompanyDto): Promise<AboutOurCompany> {
    let uploadedImage: ImageEntity;

    if (image) {
      try {
        console.log('Image from category,', image);
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
    return await this.aboutOurCompanyRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Delete all entries
        await transactionalEntityManager.softDelete(AboutOurCompany, {});

        // Create and save new entry
        const aboutUsDetails = this.aboutOurCompanyRepo.create({
          heading,
          descriptionOne,
          descriptionTwo,
          sideText,
        });

        if (image) {
          aboutUsDetails.image = uploadedImage;
        }

        return transactionalEntityManager.save(AboutOurCompany, aboutUsDetails);
      },
    );
  }

  async getAboutOurCompany(): Promise<AboutOurCompany[]> {
    return this.aboutOurCompanyRepo.find({ relations: ['image'] });
  }

  async createOurPrinciple({
    heading,
    description,
    image,
  }: CreateOurPrincipleDto) {
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

    const principle = this.ourPrincipleRepo.create({
      heading,
      description,
      image: uploadedImage,
    });

    return this.ourPrincipleRepo.save(principle);
  }

  async updateOurPrinciple(
    id: string,
    { heading, description, image }: UpdateOurPrincipleDto,
  ) {
    const existingPrinciple = await this.ourPrincipleRepo.findOne({
      where: { id },
    });
    if (!existingPrinciple) {
      throw new NotFoundException(`No principle found with id: ${id}`);
    }
    let uploadedImage: ImageEntity;
    if (image) {
      try {
        console.log('Image from category,', image);
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

    Object.assign(existingPrinciple, {
      heading,
      description,
    });

    if (image) {
      existingPrinciple.image = uploadedImage;
    }

    return this.ourPrincipleRepo.save(existingPrinciple);
  }

  async deletePrinciple(id: string): Promise<SuccessMessageDto> {
    await this.ourPrincipleRepo.softDelete({ id });

    return { message: 'Principle Deleted Successfully' };
  }

  async getOurPrincipleById(id: string): Promise<OurThreePrinciples> {
    return this.ourPrincipleRepo.findOne({ where: { id } });
  }

  async getAllOurPrinciples(): Promise<OurThreePrinciples[]> {
    return this.ourPrincipleRepo.find({ relations: ['image'] });
  }

  async deleteOurPrinciple(id: string): Promise<SuccessMessageDto> {
    await this.ourPrincipleRepo.softDelete({ id });
    return { message: 'Principle deleted successfully' };
  }

  async createTestimonial({
    name,
    designation,
    description,
    rating,
    image,
  }: CreateTestimonialDto): Promise<Testimonials> {
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

    const principle = this.testiMonialsRepo.create({
      name,
      designation,
      description,
      rating,
      image: uploadedImage,
    });

    return this.testiMonialsRepo.save(principle);
  }

  async updateTestimonial(
    id: string,
    { name, designation, description, rating, image }: UpdateTestimonialDto,
  ): Promise<Testimonials> {
    const existingTestimonial = await this.testiMonialsRepo.findOne({
      where: { id },
    });
    if (!existingTestimonial) {
      throw new NotFoundException(`No testimonial found with id: ${id}`);
    }
    let uploadedImage: ImageEntity;
    if (image) {
      try {
        console.log('Image from category,', image);
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

    Object.assign(existingTestimonial, {
      name,
      designation,
      description,
      rating,
    });

    if (image) {
      existingTestimonial.image = uploadedImage;
    }

    return this.testiMonialsRepo.save(existingTestimonial);
  }

  async deleteTestimonial(id: string): Promise<SuccessMessageDto> {
    try {
      await this.testiMonialsRepo.softDelete({ id });
    } catch (error) {
      console.log(`Error deleting testimonials`, error);
      throw new InternalServerErrorException(`Error deleting testimonials`);
    }

    return { message: 'Principle Deleted Successfully' };
  }

  async getTestimonialById(id: string): Promise<Testimonials> {
    return this.testiMonialsRepo.findOne({ where: { id } });
  }

  async getAllTestimonials(): Promise<Testimonials[]> {
    return this.testiMonialsRepo.find({ relations: ['image'] });
  }

  async createWhyChooseUs({
    heading,
    description,
    image,
    cards,
  }: CreateWhyChooseUsDto): Promise<WhyChooseUs> {
    let uploadedImage: ImageEntity;
    if (image) {
      try {
        console.log('Image from category,', image);
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
    return await this.chooseUsRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Delete all entries
        await transactionalEntityManager.softDelete(WhyChooseUs, {});

        // Create and save new entry
        const aboutUsDetails = this.chooseUsRepo.create({
          heading,
          description,
          cards,
        });

        if (image) {
          aboutUsDetails.image = uploadedImage;
        }

        return transactionalEntityManager.save(WhyChooseUs, aboutUsDetails);
      },
    );
  }

  async getWhyChooseUs(): Promise<WhyChooseUs[]> {
    return this.chooseUsRepo.find({ relations: ['image'] });
  }
}
