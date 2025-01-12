import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDto } from 'src/home-page/dto';
import { ContactDetails, UserEnquiry } from 'src/home-page/entities';
import { Repository } from 'typeorm';
import { UserEnquiryDto } from './dto';

@Injectable()
export class ContactUsPageService {
  constructor(
    @InjectRepository(ContactDetails)
    private contactDetailsRepo: Repository<ContactDetails>,
    @InjectRepository(UserEnquiry)
    private userEnquiryRepo: Repository<UserEnquiry>,
  ) {}

  // First Delete previous contact details and then save new one ( In transaction)
  async createContactDetails({
    phonNumber,
    extraPhonNumber,
    email,
    extraEmail,
    address,
    googelMapLocation,
    img,
    imgPublicID,
  }: ContactDto): Promise<ContactDetails> {
    return await this.contactDetailsRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Delete all entries
        await transactionalEntityManager.delete(ContactDetails, {});

        // Create and save new entry
        const contactDetails = this.contactDetailsRepo.create({
          phonNumber,
          extraPhonNumber,
          email,
          extraEmail,
          address,
          googelMapLocation,
          img,
          imgPublicID,
        });

        return transactionalEntityManager.save(contactDetails);
      },
    );
  }

  async getContactDetails(): Promise<ContactDetails> {
    try {
      const contacts = await this.contactDetailsRepo.find();

      return contacts[0];
    } catch (error) {
      console.log(`Error get contact details`, error);
      throw new InternalServerErrorException();
    }
  }

  async userEquiry({
    name,
    mobile,
    message,
    email,
  }: UserEnquiryDto): Promise<UserEnquiry> {
    try {
      const enquiry = this.userEnquiryRepo.create({
        name,
        mobile,
        message,
        email,
      });

      return this.userEnquiryRepo.save(enquiry);
    } catch (error) {
      console.log('Error saving user enquiry', error);
      throw new InternalServerErrorException();
    }
  }

  async getAllUserEnquiries(): Promise<UserEnquiry[]> {
    return this.userEnquiryRepo.find();
  }
}
