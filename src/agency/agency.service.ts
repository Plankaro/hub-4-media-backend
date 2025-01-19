import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { Agency } from './entities/agency.entity';
import { Contact } from './entities/contact.entity';
import { Social } from './entities/social.entity';
import { Location } from './entities/location.entity';
import { Timeslot } from './entities/timeslot.entity';

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
  ) {}

  // Create Agency
  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    // Transform the DTO to entity if necessary
    const agency = this.agencyRepository.create(createAgencyDto);

    // Save contact, social, location, and timeslots
    const contact = await this.contactRepository.save(createAgencyDto.contact);
    const social = await this.socialRepository.save(createAgencyDto.social);
    const location = await this.locationRepository.save(
      createAgencyDto.location,
    );

    // Handle timeslot as an array
    const timeslots = await this.timeslotRepository.save(
      createAgencyDto.timeSlots,
    );

    // Attach relations to the agency
    agency.contact = contact;
    agency.social = social;
    agency.location = location;
    agency.timeSlots = timeslots;

    // Save the agency with its related entities
    return await this.agencyRepository.save(agency);
  }

  // Get all agencies
  async findAll(): Promise<Agency[]> {
    return this.agencyRepository.find({
      relations: ['contact', 'social', 'location', 'timeSlots'],
    });
  }

  // Get agency by ID
  async findOne(id: string): Promise<Agency> {
    return this.agencyRepository.findOne({
      where: { id },
      relations: ['contact', 'social', 'location', 'timeSlots'],
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
  async remove(id: number): Promise<void> {
    await this.agencyRepository.delete(id);
  }
}
