import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { Agency } from './entities/agency.entity';
import { Contact } from './entities/contact.entity';
import { Social } from './entities/social.entity';
import { Location } from './entities/location.entity';
import { Timeslot } from './entities/timeslot.entity';
import { AgencyServiceEntity } from './entities/service.entity';
import { ImageEntity } from 'src/common/entities';
import { AgencyCategory } from './entities/category.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AgencyQueryValidatorDto } from './dto/agency-query.dto';
import { AgencysListDto } from './dto/agency-list.dto';
import { getPaginationMeta } from 'src/common/utility';
import { SortOrder } from 'src/common/types';
import { AgencySubCategory } from './entities/sub-category';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Timeslot)
    private readonly timeslotRepository: Repository<Timeslot>,
    @InjectRepository(AgencyServiceEntity)
    private readonly agencyServiceRepository: Repository<AgencyServiceEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Create Agency
  async create(createAgencyDto: CreateAgencyDto): Promise<any> {
    // Transform the DTO to entity if necessary
    console.log(
      '🚀 ~ AgencyService ~ create ~ createAgencyDto.agencyLogo:',
      createAgencyDto.agencyLogo,
    );

    try {
      const imageUpload = await this.cloudinaryService.uploadFiles(
        createAgencyDto.agencyLogo,
      );
      console.log('🚀 ~ AgencyService ~ create ~ imageUpload:', imageUpload);

      if (!imageUpload || imageUpload.length === 0) {
        throw new BadRequestException(
          'Image upload failed or returned no data.',
        );
      }

      return await this.agencyRepository.manager.transaction(
        async (manager) => {
          const savedImage = await manager.save(
            this.imageRepo.create({
              imageName: imageUpload?.[0].original_filename,
              imageUrl: imageUpload?.[0].url,
            }),
          );
          console.log('🚀 ~ AgencyService ~ savedImage:', savedImage);

          const contact = await manager.save(
            this.contactRepository.create(createAgencyDto.contact),
          );
          const social = await manager.save(
            this.socialRepository.create(createAgencyDto.social),
          );
          const location = await manager.save(
            this.locationRepository.create(createAgencyDto.location),
          );
          const timeslots = await manager.save(
            this.timeslotRepository.create(createAgencyDto.timeSlots),
          );
          const agencyServices = await manager.save(
            this.agencyServiceRepository.create(createAgencyDto.agencyService),
          );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { agencyLogo, categoryId, subCategoryId, ...rest } =
            createAgencyDto;

          const agency = manager.create(Agency, {
            agencyLogo: {
              id: savedImage.id,
            },
            contact,
            social,
            location,
            timeSlots: timeslots,
            services: agencyServices,
            category: {
              id: categoryId,
            },
            subCategory: {
              id: subCategoryId,
            },
            ...rest,
          });

          return await manager.save(agency);
        },
      );
    } catch (error) {
      console.error(`Error uploading service image: `, error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(body: AgencyQueryValidatorDto): Promise<AgencysListDto> {
    const pageSize = body.pageSize || 10;
    const pageIndex = body.pageIndex || 0;
    const query = this.agencyRepository
      .createQueryBuilder('agency')
      .leftJoinAndSelect('agency.category', 'category')
      .leftJoinAndSelect('agency.contact', 'contact')
      .leftJoinAndSelect('agency.social', 'social')
      .leftJoinAndSelect('agency.location', 'location')
      .leftJoinAndSelect('agency.timeSlots', 'timeSlots')
      .leftJoinAndSelect('agency.services', 'services')
      .leftJoinAndSelect('agency.agencyLogo', 'agencyLogo')
      .leftJoinAndSelect('category.subCategories', 'subCategory')
      .select([
        'agency',
        'category',
        'subCategory',
        'contact',
        'social',
        'location',
        'timeSlots',
        'services',
        'agencyLogo',
      ])
      .skip(pageIndex * pageSize)
      .take(pageSize);

    // Common filters
    if (body.order) {
      query.orderBy('agency.updatedAt', body.order);
    } else {
      query.orderBy('agency.updatedAt', SortOrder.DESC);
    }

    if (body.categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId: body.categoryId,
      });
    }

    if (body.subCategoryId) {
      query.andWhere('subCategory.id = :subCategoryId', {
        subCategoryId: body.subCategoryId,
      });
    }

    const [agencies, totalItems] = await query.getManyAndCount();

    const paginationMeta = getPaginationMeta(
      { pageIndex, pageSize },
      { totalItems, itemsOnPage: agencies.length },
    );

    return {
      agencies,
      paginationMeta,
    };
  }

  // Get agency by ID
  async findOne(id: string): Promise<Agency> {
    return this.agencyRepository.findOne({
      where: { id },
      relations: [
        'contact',
        'social',
        'location',
        'timeSlots',
        'services',
        'agencyLogo',
      ],
    });
  }

  // Update Agency
  /*
   * TODO: need to check this again
   */
  async update(id: string, body: UpdateAgencyDto): Promise<Agency> {
    // You can handle the update logic here
    // await this.agencyRepository.update(id, updateAgencyDto);
    const updateAgencyDto = { ...body };
    console.log('agency duo: ', updateAgencyDto);
    try {
      const existingAgency = await this.agencyRepository.findOne({
        where: { id },
        relations: [
          'agencyLogo',
          'contact',
          'social',
          'location',
          'timeSlots',
          'services',
          'category',
          'subCategory',
        ],
      });

      if (!existingAgency) {
        throw new NotFoundException(`Agency with ID ${id} not found.`);
      }

      let updatedImage = null;
      if (updateAgencyDto.agencyLogo) {
        const imageUpload = await this.cloudinaryService.uploadFiles(
          updateAgencyDto.agencyLogo,
        );

        if (!imageUpload || imageUpload.length === 0) {
          throw new BadRequestException(
            'Image upload failed or returned no data.',
          );
        }

        updatedImage = await this.imageRepo.save({
          imageName: imageUpload[0].original_filename,
          imageUrl: imageUpload[0].url,
        });

        existingAgency.agencyLogo = updatedImage;
      }

      return await this.agencyRepository.manager.transaction(
        async (manager) => {
          if (updateAgencyDto.contact) {
            const updatedContact = await manager.save(
              this.contactRepository.create({
                ...existingAgency.contact,
                ...updateAgencyDto.contact,
              }),
            );
            existingAgency.contact = updatedContact;
          }

          if (updateAgencyDto.social) {
            const updatedSocial = await manager.save(
              this.socialRepository.create({
                ...existingAgency.social,
                ...updateAgencyDto.social,
              }),
            );
            existingAgency.social = updatedSocial;
          }

          if (updateAgencyDto.location) {
            const updatedLocation = await manager.save(
              this.locationRepository.create({
                ...existingAgency.location,
                ...updateAgencyDto.location,
              }),
            );
            existingAgency.location = updatedLocation;
          }

          if (updateAgencyDto.timeSlots) {
            const updatedTimeSlots = await manager.save(
              this.timeslotRepository.create(updateAgencyDto.timeSlots),
            );
            existingAgency.timeSlots = updatedTimeSlots;
          }

          if (updateAgencyDto.agencyService) {
            const updatedServices = await manager.save(
              this.agencyServiceRepository.create(
                updateAgencyDto.agencyService,
              ),
            );
            existingAgency.services = updatedServices;
          }

          const { categoryId, subCategoryId, ...rest } = updateAgencyDto;

          if (categoryId) {
            const category = await manager.findOne(AgencyCategory, {
              where: { id: categoryId },
            });
            if (!category) {
              throw new NotFoundException(
                `Category not found with id: ${categoryId}`,
              );
            }
            existingAgency.category = category;
          }
          if (subCategoryId) {
            const subCategory = await manager.findOne(AgencySubCategory, {
              where: { id: subCategoryId },
            });
            console.log('agency sub: ', subCategoryId, subCategory);
            if (!subCategory) {
              throw new NotFoundException(
                `Sub category not found with id: ${subCategoryId}`,
              );
            }
            existingAgency.subCategory = subCategory;
          }

          Object.assign(existingAgency, rest);

          return await manager.save(existingAgency);
        },
      );
    } catch (error) {
      console.error(`Error updating agency:`, error);
      throw new InternalServerErrorException('Failed to update agency.');
    }
  }

  // Delete Agency
  async remove(id: string): Promise<void> {
    await this.agencyRepository.softDelete(id);
  }
}
