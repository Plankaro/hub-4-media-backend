import {
  Inject,
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
  async create({
    agencyLogo,
    ...createAgencyDto
  }: CreateAgencyDto): Promise<Agency> {
    // Transform the DTO to entity if necessary

    let uploadedImage: ImageEntity[] = [];
    try {
      const imageUpload = await this.cloudinaryService.uploadFiles([
        // {
        //   data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
        //   imageName: 'agency-logo',
        // },
        agencyLogo,
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

    const agency = this.agencyRepository.create({
      agencyLogo: uploadedImage[0],
      ...createAgencyDto,
    });

    // Save contact, social, location, and timeslots
    const contact = await this.contactRepository.save(createAgencyDto.contact);
    const social = await this.socialRepository.save(createAgencyDto.social);
    const location = await this.locationRepository.save(
      createAgencyDto.location,
    );

    // Handle timeslot as an array
    // const timeslots = await this.timeslotRepository.save(
    //   createAgencyDto.timeSlots,
    // );
    const agencyServices = await this.agencyServiceRepository.save(
      createAgencyDto.agencyService,
    );

    // Attach relations to the agency
    agency.contact = contact;
    agency.social = social;
    agency.location = location;
    // agency.timeSlots = timeslots;
    agency.services = agencyServices;

    // Save the agency with its related entities
    return await this.agencyRepository.save(agency);
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
