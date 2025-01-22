import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AgencyQueryValidatorDto } from './dto/agency-query.dto';
import { AgencysListDto } from './dto/agency-list.dto';
import { getPaginationMeta } from 'src/common/utility';
import { SortOrder } from 'src/common/types';

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
  async update(id: string, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    // You can handle the update logic here
    await this.agencyRepository.update(id, updateAgencyDto);

    // Return the updated agency with its relations
    return this.agencyRepository.findOne({
      where: { id },
      relations: ['contact', 'social', 'location', 'timeSlots'],
    });
  }

  // Delete Agency
  async remove(id: string): Promise<void> {
    await this.agencyRepository.softDelete(id);
  }
}
