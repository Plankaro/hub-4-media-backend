import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDto } from 'src/home-page/dto';
import { ContactDetails, UserEnquiry } from 'src/home-page/entities';
import { Repository } from 'typeorm';
import { UserEnquiryDto } from './dto';
import { ImageEntity } from 'src/common/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ContactUsPageService {
  constructor(
    @InjectRepository(ContactDetails)
    private contactDetailsRepo: Repository<ContactDetails>,
    @InjectRepository(UserEnquiry)
    private userEnquiryRepo: Repository<UserEnquiry>,
    @InjectRepository(ImageEntity) private imageRepo: Repository<ImageEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  // First Delete previous contact details and then save new one ( In transaction)
  async createContactDetails({
    phonNumber,
    extraPhonNumber,
    email,
    extraEmail,
    address,
    googelMapLocation,
    image,
  }: ContactDto): Promise<ContactDetails> {
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

    return await this.contactDetailsRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Delete all entries
        await transactionalEntityManager.softDelete(ContactDetails, {});

        // Create and save new entry
        const contactDetails = this.contactDetailsRepo.create({
          phonNumber,
          extraPhonNumber,
          email,
          extraEmail,
          address,
          googelMapLocation,
          image: uploadedImage,
        });

        return transactionalEntityManager.save(ContactDetails, contactDetails);
      },
    );
  }

  async getContactDetails(): Promise<ContactDetails> {
    try {
      const contacts = await this.contactDetailsRepo.find({
        relations: ['image'],
      });

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
