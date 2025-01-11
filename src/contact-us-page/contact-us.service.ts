import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDto } from 'src/home-page/dto';
import { ContactDetails } from 'src/home-page/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ContactUsPageService {
  constructor(
    @InjectRepository(ContactDetails)
    private contactDetailsRepo: Repository<ContactDetails>,
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
}
