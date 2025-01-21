import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Social)
    private socialRepository: Repository<Social>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Timeslot)
    private timeslotRepository: Repository<Timeslot>,
    @InjectRepository(AgencyServiceEntity)
    private agencyServiceRepository: Repository<AgencyServiceEntity>,
    @InjectRepository(ImageEntity)
    private imageRepo: Repository<ImageEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  // Create Agency
  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    // Transform the DTO to entity if necessary

    const uploadedImage: ImageEntity[] = [];
    try {
      const imageUpload = await this.cloudinaryService.uploadFiles([
        {
          data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
          imageName: 'agency-logo',
        },
        // agencyLogo,
      ]);

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

    console.log(
      '🚀 ~ AgencyService ~ imageUpload.map ~ uploadedImage:',
      uploadedImage,
      createAgencyDto,
    );

    // const agency = this.agencyRepository.create({
    //   agencyLogo: uploadedImage[0],
    //   ...createAgencyDto,
    // });

    return await this.agencyRepository.manager.transaction(async (manager) => {
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

      const agency = manager.create(Agency, {
        ...(uploadedImage.length && { agencyLogo: uploadedImage[0] }),
        contact,
        social,
        location,
        timeSlots: timeslots,
        services: agencyServices,
        ...createAgencyDto,
      });

      console.log(
        '🚀 ~ AgencyService ~ returnawaitthis.agencyRepository.manager.transaction ~ agency:',
        agency,
      );
      return await manager.save(agency);
    });
  }

  // Get all agencies
  async findAll(): Promise<Agency[]> {
    return this.agencyRepository.find({
      relations: ['contact', 'social', 'location', 'timeSlots', 'services'],
    });
  }

  // Get agency by ID
  async findOne(id: string): Promise<Agency> {
    return this.agencyRepository.findOne({
      where: { id },
      relations: ['contact', 'social', 'location', 'timeSlots', 'services'],
    });
  }

  // Update Agency
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
    await this.agencyRepository.delete(id);
  }
}
