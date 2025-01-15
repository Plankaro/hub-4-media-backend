import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateServiceDto,
  ExtraServiceDto,
  TimeSlotDto,
  TimeSlotsOfDayDto,
} from '../dto';
import { ServiceCategoryService } from './category.service';
import { ServiceSubCategoryService } from './sub-category.service';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtraService, Service, TimeSlot, TimeSlotsOfDay } from '../entities';
import { EntityManager, Repository } from 'typeorm';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageEntity } from 'src/common/entities';
import { SuccessMessageDto } from 'src/common/dtos';
import { ServiceFilterDto } from '../dto/service-filter.dto';
import { ServicePricing } from '../entities/pricing.entity';
import { CreateServicePricingDto } from '../dto/pricing.dto';

@Injectable()
export class ServicePageService {
  constructor(
    private userService: UsersService,
    private categoryService: ServiceCategoryService,
    private subCategoryService: ServiceSubCategoryService,
    @InjectRepository(ExtraService)
    private extraServiceRepo: Repository<ExtraService>,
    @InjectRepository(TimeSlot)
    private timeSlotRepo: Repository<TimeSlot>,
    @InjectRepository(TimeSlotsOfDay)
    private availability: Repository<TimeSlotsOfDay>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    private cloudinaryService: CloudinaryService,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
    @InjectRepository(ServicePricing)
    private pricingRepo: Repository<ServicePricing>,
  ) {}
  async create(body: CreateServiceDto): Promise<Service> {
    const uploadedImage: ImageEntity[] = [];
    const {
      serviceTitle,
      description,
      pricings,
      providerId,
      categoryId,
      subCategoryId,
      extraServices,
      availability,
      images,
      seo,
      location,
      ...rest
    } = body;

    try {
      console.log(images[0]);
      const imageUpload = await this.cloudinaryService.uploadFiles(images);

      await Promise.all(
        imageUpload.map(async (image) => {
          const savedImage = await this.imageRepo.save({
            imageName: image.original_filename,
            imageUrl: image.url,
          });
          uploadedImage.push(savedImage);
        }),
      );
    } catch (error) {
      console.log(`Error uploading service image: `, error);
      throw new InternalServerErrorException();
    }

    const category = await this.categoryService.getById(categoryId);
    const subCategory = await this.subCategoryService.getById(subCategoryId);
    const user = await this.userService.findVerifiedAccountById(providerId);

    if (!user) {
      throw new NotFoundException(`Provider not found with id: ${providerId}`);
    }

    return await this.serviceRepo.manager.transaction(
      async (transactionalEntityManager) => {
        try {
          // Save extra services within the transaction
          const savedExtraServices = await Promise.all(
            extraServices.map(async (extraService) => {
              return await this.storeExtraService(
                extraService,
                transactionalEntityManager,
              );
            }),
          );

          // Save availability within the transaction
          const savedAvailability = await Promise.all(
            availability.map(async (avail) => {
              return await this.saveAvailability(
                avail,
                transactionalEntityManager,
              );
            }),
          );

          // Save availability within the transaction
          const savedPricing = await Promise.all(
            pricings.map(async (price) => {
              return await this.savePricing(price, transactionalEntityManager);
            }),
          );

          const serviceObj = this.serviceRepo.create({
            serviceTitle,
            description,
            address: location.address,
            country: location.country,
            city: location.city,
            state: location.state,
            pincode: location.pincode,
            metaDescription: seo.description,
            metaKeywords: seo.keywords,
            metaTitle: seo.title,
            category,
            subCategory,
            provider: user,
            extraServices: savedExtraServices,
            availability: savedAvailability,
            images: uploadedImage,
            googleMapLink: location.googleMapLink,
            pricings: savedPricing,
            ...rest,
          });

          // Save the service object within the transaction
          return await transactionalEntityManager.save(Service, serviceObj);
        } catch (error) {
          console.log('Error during transaction:', error);
          throw new InternalServerErrorException();
        }
      },
    );
  }

  async update(
    id: string,
    {
      serviceTitle,
      description,
      providerId,
      categoryId,
      subCategoryId,
      extraServices,
      availability,
      location,
      images,
      seo,
    }: CreateServiceDto,
  ): Promise<Service> {
    const existingService = await this.serviceRepo.findOne({ where: { id } });

    const uploadedImage: ImageEntity[] = [];
    try {
      console.log(images[0]);
      const imageUpload = await this.cloudinaryService.uploadFiles(images);

      await Promise.all(
        imageUpload.map(async (image) => {
          const savedImage = await this.imageRepo.save({
            imageName: image.original_filename,
            imageUrl: image.url,
          });
          uploadedImage.push(savedImage);
        }),
      );
    } catch (error) {
      console.log(`Error uploading service image: `, error);
      throw new InternalServerErrorException();
    }

    const category = await this.categoryService.getById(categoryId);
    const subCategory = await this.subCategoryService.getById(subCategoryId);
    const user = await this.userService.findVerifiedAccountById(providerId);

    if (!user) {
      throw new NotFoundException(`Provider not found with id: ${providerId}`);
    }

    return await this.serviceRepo.manager.transaction(
      async (transactionalEntityManager) => {
        try {
          // Saving extra services within the transaction
          const savedExtraServices = await Promise.all(
            extraServices.map(async (extraService) => {
              return await this.storeExtraService(
                extraService,
                transactionalEntityManager,
              );
            }),
          );

          // Saving availability within the transaction
          const savedAvailability = await Promise.all(
            availability.map(async (avail) => {
              return await this.saveAvailability(
                avail,
                transactionalEntityManager,
              );
            }),
          );

          Object.assign(existingService, {
            category,
            subCategory,
            provider: user,
            extraServices: savedExtraServices,
            availability: savedAvailability,
            image: uploadedImage,
            address: location.address,
            country: location.country,
            city: location.city,
            state: location.state,
            pincode: location.pincode,
            metaDescription: seo.description,
            metaKeywords: seo.keywords,
            metaTitle: seo.title,

            serviceTitle,
            description,
          });
          // Saving the service object within the transaction
          return await transactionalEntityManager.save(
            Service,
            existingService,
          );
        } catch (error) {
          console.log('Error during transaction:', error);
          throw new InternalServerErrorException();
        }
      },
    );
  }

  async getById(id: string): Promise<Service> {
    const service = await this.serviceRepo.findOne({
      where: { id },
      relations: [
        'images',
        'category',
        'subCategory',
        'pricings',
        'provider',
        'extraServices',
        'availability',
        'availability.timeSlots',
      ],
    });
    if (!service) {
      throw new NotFoundException(`No service found with id: ${id}`);
    }

    return service;
  }

  async getAllServices(filters: ServiceFilterDto): Promise<Service[]> {
    // const query = this.serviceRepo.createQueryBuilder('service');
    const query = this.serviceRepo
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.images', 'images')
      .leftJoinAndSelect('service.category', 'category')
      .leftJoinAndSelect('service.subCategory', 'subCategory')
      .leftJoinAndSelect('service.pricings', 'pricings')
      .leftJoinAndSelect('service.provider', 'provider')
      .leftJoinAndSelect('service.availability', 'availability')
      .leftJoinAndSelect('service.extraServices', 'extraServices')
      .leftJoinAndSelect('availability.timeSlots', 'timeSlots');

    if (filters?.categoryId) {
      query.where('category.id = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    if (filters?.subCategoryId) {
      query.andWhere('subCategory.id = :subCategoryId', {
        subCategoryId: filters.subCategoryId,
      });
    }

    if (filters?.keyWords) {
      query.andWhere('service.serviceTitle IN (:...keyWords)', {
        keyWords: filters.keyWords,
      });
    }

    if (filters?.minPrice) {
      query.andWhere('pricings.offerPrice >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }

    if (filters?.maxPrice) {
      query.andWhere('pricings.offerPrice <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    // query.leftJoinAndSelect('service.category', 'category');
    // query.leftJoinAndSelect('service.provider', 'provider');

    // Join the category relationship
    // query.leftJoinAndSelect('service.category', 'category');
    // query.leftJoinAndSelect('service.provider', 'provider');

    // Apply filtering by category if `categoryId` is provided
    // if (categoryId) {
    //   query.where('category.id = :categoryId', { categoryId });
    // }

    // Fetch the results
    return query.getMany();

    // return this.serviceRepo.find({
    //   relations: ['category', 'provider', 'images', 'extraServices'],
    // });
  }

  async delete(id: string): Promise<SuccessMessageDto> {
    try {
      const result = await this.serviceRepo.softDelete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`service with id ${id} not found`);
      }
    } catch (error) {
      console.error(`Error while deleting service with id: ${id}`, error);
      throw new InternalServerErrorException('Failed to delete the service');
    }

    return { message: 'Service deleted successfully' };
  }

  async storeExtraService(
    extraServices: ExtraServiceDto,
    transactionalEntityManager: EntityManager,
  ): Promise<ExtraService> {
    const extraServiceObj = this.extraServiceRepo.create({
      title: extraServices.title,
      price: extraServices.price,
      duration: extraServices.duration,
    });

    return await transactionalEntityManager.save(ExtraService, extraServiceObj);
  }

  async saveAvailability(
    availability: TimeSlotsOfDayDto,
    transactionalEntityManager: EntityManager,
  ): Promise<TimeSlotsOfDay> {
    // Handling multiple time slot entries
    const timeSlots = await Promise.all(
      availability.timeSlots.map(
        async (timeSlot) =>
          await this.saveTimeSlots(timeSlot, transactionalEntityManager),
      ),
    );

    const availabilityObj = this.availability.create({
      day: availability.day,
      timeSlots: timeSlots,
    });
    return await transactionalEntityManager.save(
      TimeSlotsOfDay,
      availabilityObj,
    );
  }

  async savePricing(
    price: CreateServicePricingDto,
    transactionalEntityManager: EntityManager,
  ): Promise<ServicePricing> {
    // Handling multiple time slot entries
    const pricingObj = this.pricingRepo.create({
      ...price,
    });
    return await transactionalEntityManager.save(ServicePricing, pricingObj);
  }

  async saveTimeSlots(
    { from, to, slot }: TimeSlotDto,
    transactionalEntityManager: EntityManager,
  ): Promise<TimeSlot> {
    const timeSlotObj = this.timeSlotRepo.create({ from, to, slot });
    return await transactionalEntityManager.save(TimeSlot, timeSlotObj);
  }
}
