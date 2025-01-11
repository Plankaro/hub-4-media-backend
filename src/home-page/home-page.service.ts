import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AboutOurCompany,
  ContactDetails,
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  OurThreePrinciples,
  Plans,
  SectionHeadings,
  Testimonials,
  UserEnquiry,
  WhyChooseUs,
} from './entities';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  HeroHeadingsDto,
  HowItWorksDto,
  OfferHeadingsDto,
  SectionHeadingDto,
} from './dto';
import { PricePlanDto } from './dto/price-plan.dto';
import { SuccessMessageDto } from 'src/auth/dtos';

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(HeroHeadings)
    private heroHeadingsRepo: Repository<HeroHeadings>,

    @InjectRepository(HowItWorks)
    private howItWorksRepo: Repository<HowItWorks>,

    @InjectRepository(SectionHeadings)
    private sectionHeadingsRepo: Repository<SectionHeadings>,

    @InjectRepository(Plans)
    private plansRepo: Repository<Plans>,

    @InjectRepository(OfferHeadings)
    private offerHeadingsRepo: Repository<OfferHeadings>,

    @InjectRepository(ContactDetails)
    private contactDetailsRepo: Repository<ContactDetails>,

    @InjectRepository(UserEnquiry)
    private userEnquiryRepo: Repository<UserEnquiry>,

    @InjectRepository(AboutOurCompany)
    private aboutOurCompanyRepo: Repository<AboutOurCompany>,

    @InjectRepository(OurThreePrinciples)
    private ourThreePrinciplesRepo: Repository<OurThreePrinciples>,

    @InjectRepository(WhyChooseUs)
    private whyChooseRepo: Repository<WhyChooseUs>,

    @InjectRepository(Testimonials)
    private testimonialsRepo: Repository<Testimonials>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Add Hero Headlines
  async addHeroHeadlines({
    firstHeading,
    secondHeading,
    thirdHeading,
  }: HeroHeadingsDto) {
    // const heroHeading = this.heroHeadingsRepo.create({
    //   firstHeading,
    //   secondHeading,
    //   thirdHeading,
    // });

    // return this.heroHeadingsRepo.save(heroHeading);

    return await this.heroHeadingsRepo.manager.transaction(
      async (transactionalEntityManager) => {
        // Delete all entries
        await transactionalEntityManager.delete(HeroHeadings, {});

        // Create and save new entry
        const heroHeading = this.heroHeadingsRepo.create({
          firstHeading,
          secondHeading,
          thirdHeading,
        });

        return transactionalEntityManager.save(heroHeading);
      },
    );
  }

  // async updateHeroHeadings(
  //   id: string,
  //   { firstHeading, secondHeading, thirdHeading }: HeroHeadingsDto,
  // ): Promise<HeroHeadings> {
  //   try {
  //     const heroHeadings = await this.heroHeadingsRepo.findOne({
  //       where: { id },
  //     });

  //     if (!heroHeadings) {
  //       throw new NotFoundException(`No Headings found with id: ${id}`);
  //     }

  //     heroHeadings.firstHeading = firstHeading;
  //     heroHeadings.secondHeading = secondHeading;
  //     heroHeadings.thirdHeading = thirdHeading;

  //     // Success response
  //     return this.heroHeadingsRepo.save(heroHeadings);
  //   } catch (error) {
  //     console.log(`Error while updating home page heading: ${error}`);
  //     throw new InternalServerErrorException();
  //   }
  // }

  async getHeroHeadings(): Promise<HeroHeadings> {
    const heroHeading = await this.heroHeadingsRepo.find();

    if (!heroHeading) {
      throw new NotFoundException('Hero heading not found');
    }

    return heroHeading[0];
  }

  async addHowItWorks({ title, description }: HowItWorksDto) {
    const howItWorks = this.howItWorksRepo.create({
      title,
      description,
    });
    return this.howItWorksRepo.save(howItWorks);
  }

  async updateHowItWorks(
    id: string,
    { title, description }: HowItWorksDto,
  ): Promise<HowItWorks> {
    try {
      const howItWorks = await this.howItWorksRepo.findOne({ where: { id } });

      if (!howItWorks) {
        throw new NotFoundException(
          `No How-Its-Works data found with id: ${id} `,
        );
      }

      howItWorks.title = title;
      howItWorks.description = description;

      return this.howItWorksRepo.save(howItWorks);
    } catch (error) {
      console.log(`Error at updating how it works`, error);
      throw new InternalServerErrorException();
    }
  }

  async getHowItWork(): Promise<HowItWorks> {
    const howItWorks = await this.howItWorksRepo.find();

    if (!howItWorks && howItWorks.length <= 0) {
      throw new NotFoundException('No data found for How-It-Works');
    }

    return howItWorks[0];
  }

  async addSectionHeadings({
    heading,
    sectionName,
    subheading,
  }: SectionHeadingDto): Promise<SectionHeadings> {
    try {
      const sectionheadings = this.sectionHeadingsRepo.create({
        heading,
        sectionName,
        subheading,
      });

      return this.sectionHeadingsRepo.save(sectionheadings);
    } catch (error) {
      console.log(`Error saving section headings`, error);
      throw new InternalServerErrorException();
    }
  }

  async updateSectionHeadings(
    id: string,
    { heading, sectionName, subheading }: SectionHeadingDto,
  ): Promise<SectionHeadings> {
    try {
      const sectionHeadings = await this.sectionHeadingsRepo.findOne({
        where: { id },
      });

      if (!sectionHeadings) {
        throw new NotFoundException(
          `Section Headings is not found with id: ${id} `,
        );
      }

      sectionHeadings.heading = heading;
      sectionHeadings.sectionName = sectionName;
      sectionHeadings.subheading = subheading;

      return this.sectionHeadingsRepo.save(sectionHeadings);
    } catch (error) {
      console.log(`Error updating section headings with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }

  async getSectionHeadings(): Promise<SectionHeadings[]> {
    try {
      return this.sectionHeadingsRepo.find();
    } catch (error) {
      console.log(`Error getting section headings`, error);

      throw new InternalServerErrorException();
    }
  }

  async getSectionHeadingByName(sectionName: string): Promise<SectionHeadings> {
    try {
      const data = await this.sectionHeadingsRepo.findOne({
        where: { sectionName },
      });
      if (!data) {
        throw new NotFoundException(
          `No section heading found with name: ${sectionName}`,
        );
      }

      return data;
    } catch (error) {
      console.log(
        `Error while finding section Heading by name: ${sectionName}`,
        error,
      );

      throw new InternalServerErrorException();
    }
  }

  async addPricePlan({
    plan,
    heading,
    line,
    free,
    slogan,
    amount,
    services,
  }: PricePlanDto): Promise<Plans> {
    try {
      const newPlan = this.plansRepo.create({
        plan,
        heading,
        line,
        free,
        slogan,
        amount,
        services,
      });

      return this.plansRepo.save(newPlan);
    } catch (error) {
      console.log(`Error creating new plan `, error);
      throw new InternalServerErrorException();
    }
  }

  async updatePricePlan(
    id: string,
    { plan, heading, line, free, slogan, amount, services }: PricePlanDto,
  ): Promise<Plans> {
    try {
      const existingPlan = await this.plansRepo.findOne({ where: { id } });

      if (!existingPlan) {
        throw new NotFoundException(`No price plan found with id: ${id}`);
      }

      Object.assign(existingPlan, {
        plan,
        heading,
        line,
        free,
        slogan,
        amount,
        services,
      });

      return this.plansRepo.save(existingPlan);
    } catch (error) {
      console.log(`Error while updating plan with id: ${id}`, error);

      throw new InternalServerErrorException();
    }
  }

  async getAllPricePlans(): Promise<Plans[]> {
    return this.plansRepo.find();
  }

  async deletePricePlanById(id: string): Promise<SuccessMessageDto> {
    try {
      const deletedPlan = await this.plansRepo.findOne({ where: { id } });

      if (!deletedPlan) {
        throw new NotFoundException(`No plan found with id: ${id}`);
      }

      await this.plansRepo.softDelete({ id });

      return { message: 'Deleted Successfully' };
    } catch (error) {
      console.log(`Error while deleting price plan with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }

  async addOfferHeadings({
    heading,
    subheading,
    description,
  }: OfferHeadingsDto): Promise<OfferHeadings> {
    try {
      const offerHeading = this.offerHeadingsRepo.create({
        heading,
        subheading,
        description,
      });
      return this.offerHeadingsRepo.save(offerHeading);
    } catch (error) {
      console.log(`Error adding offer heading`, error);
      throw new InternalServerErrorException();
    }
  }

  async updateOfferHeadings(
    id: string,
    { heading, subheading, description }: OfferHeadingsDto,
  ): Promise<OfferHeadings> {
    try {
      const offerHeading = await this.offerHeadingsRepo.findOne({
        where: { id },
      });

      if (!offerHeading) {
        throw new NotFoundException(`No offer found with id: ${id}`);
      }

      Object.assign(offerHeading, { heading, subheading, description });

      return this.offerHeadingsRepo.save(offerHeading);
    } catch (error) {
      console.log(`Error while updating offer heading with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }

  async getAllOfferHeadings(): Promise<OfferHeadings[]> {
    return this.offerHeadingsRepo.find();
  }

  async deleteOfferHeadings(id: string): Promise<SuccessMessageDto> {
    try {
      const offer = await this.offerHeadingsRepo.findOne({
        where: { id },
      });

      if (!offer) {
        throw new NotFoundException(`No plan found with id: ${id}`);
      }

      await this.plansRepo.softDelete({ id });

      return { message: 'Deleted Successfully' };
    } catch (error) {
      console.log(`Error deleting offer heading with id: ${id}`, error);
      throw new InternalServerErrorException();
    }
  }

  // async createContactDetail(createContactDto: CreateUserDto): Promise<any> {
  //   const createdContact = new this.contactDetailModel(createContactDto);
  //   await createdContact.save();
  //   return { success: true, message: 'Contact details saved successfully' };
  // }

  // async getContactDetails(): Promise<any> {
  //   try {
  //     const contacts = await this.contactDetailModel.find().exec();

  //     return {
  //       success: true,
  //       message: 'Contact details retrieved successfully',
  //       data: contacts,
  //     };
  //   } catch (error) {
  //     return { success: false, message: 'Failed to retrieve contact details' };
  //   }
  // }

  // async updateContactDetail(
  //   id: string,
  //   updateContactDto: Partial<CreateUserDto>,
  //   file?: Express.Multer.File,
  // ): Promise<any> {
  //   try {
  //     // Find the existing testimonial to check for the existing image
  //     const existingTestimonial = await this.contactDetailModel.findById(id);

  //     if (!existingTestimonial) {
  //       return {
  //         success: false,
  //         message: `Contact data not found with ID: ${id}`,
  //       };
  //     }

  //     // If an image is provided and there was a previous image, delete the old image
  //     let img = '';
  //     let imgPublicID = '';
  //     if (file) {
  //       // Delete the old image if it exists
  //       if (existingTestimonial.imgPublicID) {
  //         await this.cloudinaryService.deleteImage(
  //           existingTestimonial.imgPublicID,
  //         );
  //       }

  //       // Upload the new image to Cloudinary
  //       const result = await this.cloudinaryService.uploadImage(file);
  //       img = result.secure_url;
  //       imgPublicID = result.public_id;
  //     }

  //     // Update the testimonial with new data and image information
  //     const updatedContactModal =
  //       await this.contactDetailModel.findOneAndUpdate(
  //         { _id: id }, // Filter by ID
  //         {
  //           ...updateContactDto,
  //           ...(file ? { img, imgPublicID } : {}),
  //         },
  //         { new: true }, // Return the updated document
  //       );

  //     return {
  //       data: updatedContactModal,
  //       success: true,
  //       message: 'contact updated successfully',
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'An error occurred while updating contact details data',
  //       error: error.message,
  //     };
  //   }
  // }

  // async submitForm(formDto: CreateUserDto): Promise<any> {
  //   try {
  //     const formSubmission = new this.UserEnquiryDataModel(formDto);
  //     await formSubmission.save();
  //     return { success: true, message: 'Form submitted successfully' };
  //   } catch (error) {
  //     return { success: false, message: 'Failed to submit form' };
  //   }
  // }

  // async createAbout(data: {
  //   heading: string;
  //   descriptionOne: string;
  //   descriptionTwo: string;
  //   sideText: string;
  // }) {
  //   try {
  //     const aboutData = new this.aboutModelCompany(data);
  //     await aboutData.save();
  //     return {
  //       success: true,
  //       message: 'About our company information submitted successfully',
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'Failed to submit about our company information',
  //       error: error.message,
  //     };
  //   }
  // }

  // async updateAbout(
  //   id: string,
  //   updateAboutDto: Partial<CreateUserDto>,
  //   file?: Express.Multer.File,
  // ) {
  //   try {
  //     // Find the existing testimonial to check for the existing image
  //     const existingData = await this.aboutModelCompany.findById(id);

  //     if (!existingData) {
  //       return {
  //         success: false,
  //         message: `About Data not found with ID: ${id}`,
  //       };
  //     }

  //     // If an image is provided and there was a previous image, delete the old image
  //     let img = '';
  //     let imgPublicID = '';
  //     if (file) {
  //       // Delete the old image if it exists
  //       if (existingData.imgPublicID) {
  //         await this.cloudinaryService.deleteImage(existingData.imgPublicID);
  //       }

  //       // Upload the new image to Cloudinary
  //       const result = await this.cloudinaryService.uploadImage(file);
  //       img = result.secure_url;
  //       imgPublicID = result.public_id;
  //     }

  //     // Update the testimonial with new data and image information
  //     const updatedData = await this.aboutModelCompany.findOneAndUpdate(
  //       { _id: id }, // Filter by ID
  //       {
  //         ...updateAboutDto,
  //         ...(file ? { img, imgPublicID } : {}),
  //       },
  //       { new: true }, // Return the updated document
  //     );

  //     return {
  //       data: updatedData,
  //       success: true,
  //       message: 'contact updated successfully',
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'An error occurred while updating contact details data',
  //       error: error.message,
  //     };
  //   }
  // }

  // async getAbouOurCompany(): Promise<any> {
  //   try {
  //     const data = await this.aboutModelCompany.find().exec();

  //     return {
  //       success: true,
  //       message: 'about our company  retrieved successfully',
  //       data: data,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'Failed to retrieve about our company',
  //     };
  //   }
  // }

  // async addOurThreePrinciples(
  //   createUserDto: CreateUserDto,
  //   res: Response,
  // ): Promise<any> {
  //   try {
  //     const createdPrinciple = new this.ourThreePrinciplesModel(createUserDto);
  //     const savedData = await createdPrinciple.save();
  //     return res.status(201).json({
  //       success: true,
  //       data: savedData,
  //       message: 'Our Three Principles added successfully',
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'An error occurred while adding Our Three Principles',
  //       error: error.message,
  //     });
  //   }
  // }

  // // Update OurThreePrinciples
  // async updateOurThreePrinciples(
  //   id: string,
  //   updateUserDto: UpdateUserDto,
  //   res: Response,
  // ): Promise<any> {
  //   try {
  //     const updatedPrinciple =
  //       await this.ourThreePrinciplesModel.findOneAndUpdate(
  //         { _id: id },
  //         updateUserDto,
  //         { new: true },
  //       );

  //     if (!updatedPrinciple) {
  //       return res.status(404).json({
  //         success: false,
  //         message: `Our Three Principles not found with ID: ${id}`,
  //       });
  //     }

  //     return res.status(200).json({
  //       data: updatedPrinciple,
  //       success: true,
  //       message: 'Our Three Principles updated successfully',
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'An error occurred while updating Our Three Principles',
  //       error: error.message,
  //     });
  //   }
  // }

  // // Get OurThreePrinciples
  // async getOurThreePrinciples(res: Response): Promise<any> {
  //   try {
  //     const data = await this.ourThreePrinciplesModel.find().exec();
  //     if (data.length > 0) {
  //       return res.status(200).json({
  //         success: true,
  //         data: data,
  //         message: 'Our Three Principles fetched successfully',
  //       });
  //     } else {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'No Our Three Principles found',
  //       });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'An error occurred while fetching Our Three Principles',
  //       error: error.message,
  //     });
  //   }
  // }

  // //whaychoose us

  // async addOurWhayChooseUs(
  //   createUserDto: CreateUserDto,
  //   res: Response,
  // ): Promise<any> {
  //   try {
  //     const createdPrinciple = new this.WhayChooseUsModel(createUserDto);
  //     const savedData = await createdPrinciple.save();
  //     return res.status(201).json({
  //       success: true,
  //       data: savedData,
  //       message: 'Our Three Principles added successfully',
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'An error occurred while adding Our Three Principles',
  //       error: error.message,
  //     });
  //   }
  // }

  // async updateWhayChooseUs(
  //   id: string,
  //   updateWhayChooseUsDTO: CreateUserDto,
  //   file?: Express.Multer.File,
  // ): Promise<any> {
  //   try {
  //     const existingData = await this.WhayChooseUsModel.findById(id);
  //     console.log('existing>>>>>>', existingData);

  //     if (!existingData) {
  //       return {
  //         success: false,
  //         message: `About Data not found with ID: ${id}`,
  //       };
  //     }

  //     let img = '';
  //     let imgPublicID = '';
  //     if (file) {
  //       // Delete the old image if it exists
  //       if (existingData.imgPublicID) {
  //         await this.cloudinaryService.deleteImage(existingData.imgPublicID);
  //       }

  //       const result = await this.cloudinaryService.uploadImage(file);
  //       img = result.secure_url;
  //       imgPublicID = result.public_id;
  //     }

  //     const updatedData = await this.WhayChooseUsModel.findOneAndUpdate(
  //       { _id: id },
  //       {
  //         ...updateWhayChooseUsDTO,
  //         ...(file ? { img, imgPublicID } : {}),
  //       },
  //       { new: true },
  //     );

  //     return {
  //       data: updatedData,
  //       success: true,
  //       message: 'whay choose us updated successfully',
  //     };
  //   } catch (error) {
  //     console.log(error.message);
  //     return {
  //       success: false,
  //       message: 'An error occurred while updating whaychoose us details data',
  //       error: error.message,
  //     };
  //   }
  // }

  // async getWhayChooseUs(res: Response): Promise<any> {
  //   try {
  //     const data = await this.WhayChooseUsModel.find().exec();
  //     if (data.length > 0) {
  //       return res.status(200).json({
  //         success: true,
  //         data: data,
  //         message: 'Our Three Principles fetched successfully',
  //       });
  //     } else {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'No Our Three Principles found',
  //       });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'An error occurred while fetching Our Three Principles',
  //       error: error.message,
  //     });
  //   }
  // }

  // //tesitmonials
  // async uploadUserImage(file: Express.Multer.File): Promise<any> {
  //   console.log('file>><<', file);
  //   try {
  //     const result = await this.cloudinaryService.uploadImage(file);
  //     console.log('your_public_id_here', result);
  //     return {
  //       success: true,
  //       imageUrl: result.secure_url,
  //     };
  //   } catch (error) {
  //     return { success: false, message: 'Image upload failed' };
  //   }
  // }
  // async addTesimonials(
  //   createUserDto: CreateUserDto,
  //   res: Response,
  //   file?: Express.Multer.File,
  // ): Promise<any> {
  //   try {
  //     let profilePictureUrl = '';
  //     let imgPublicID = '';

  //     // If a file is provided, upload it to Cloudinary
  //     if (file) {
  //       const result = await this.cloudinaryService.uploadImage(file);
  //       profilePictureUrl = result.secure_url;
  //       imgPublicID = result.public_id;
  //     }

  //     // Create the testimonial with or without image data
  //     const testimonialData = {
  //       ...createUserDto,
  //       profilePictureUrl,
  //       imgPublicID,
  //     };
  //     const createdTestimonial = new this.TestimonialModel(testimonialData);
  //     const savedData = await createdTestimonial.save();

  //     return res.status(HttpStatus.CREATED).json({
  //       success: true,
  //       data: savedData,
  //       message: 'Testimonial added successfully',
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'An error occurred while adding Testimonial',
  //       error: error.message,
  //     });
  //   }
  // }

  // async updateTesimonials(
  //   id: string,
  //   updateUserDto: UpdateUserDto,
  //   file?: Express.Multer.File, // Include the file parameter
  // ): Promise<any> {
  //   try {
  //     // Find the existing testimonial to check for the existing image
  //     const existingTestimonial = await this.TestimonialModel.findById(id);

  //     if (!existingTestimonial) {
  //       return {
  //         success: false,
  //         message: `Testimonial not found with ID: ${id}`,
  //       };
  //     }

  //     // If an image is provided and there was a previous image, delete the old image
  //     let profilePictureUrl = '';
  //     let imgPublicID = '';
  //     if (file) {
  //       // Delete the old image if it exists
  //       if (existingTestimonial.imgPublicID) {
  //         await this.cloudinaryService.deleteImage(
  //           existingTestimonial.imgPublicID,
  //         );
  //       }

  //       // Upload the new image to Cloudinary
  //       const result = await this.cloudinaryService.uploadImage(file);
  //       profilePictureUrl = result.secure_url;
  //       imgPublicID = result.public_id;
  //     }

  //     // Update the testimonial with new data and image information
  //     const updatedTestimonialModel =
  //       await this.TestimonialModel.findOneAndUpdate(
  //         { _id: id }, // Filter by ID
  //         {
  //           ...updateUserDto,
  //           ...(file ? { profilePictureUrl, imgPublicID } : {}), // Update image fields only if a file is provided
  //         },
  //         { new: true }, // Return the updated document
  //       );

  //     return {
  //       data: updatedTestimonialModel,
  //       success: true,
  //       message: 'Testimonial updated successfully',
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'An error occurred while updating Testimonial data',
  //       error: error.message,
  //     };
  //   }
  // }

  // // async updateTesimonials(
  // //   id: string,
  // //   updateUserDto: UpdateUserDto,

  // // ): Promise<any> {
  // //   try {
  // //     const updatedTestimonialModel =
  // //       await this.TestimonialModel.findOneAndUpdate(
  // //         { _id: id }, // Filter by ID
  // //         updateUserDto, // Data to update
  // //         { new: true }, // Return the updated document
  // //       );

  // //     if (!updatedTestimonialModel) {
  // //       return {
  // //         success: false,
  // //         message: `Testimonial not found with ID: ${id}`,
  // //       };
  // //     }

  // //     return {
  // //       data: updatedTestimonialModel,
  // //       success: true,
  // //       message: 'Testimonial updated successfully',
  // //     };
  // //   } catch (error) {
  // //     return {
  // //       success: false,
  // //       message: 'An error occurred while updating Testimonial data',
  // //       error: error.message,
  // //     };
  // //   }
  // // }

  // async findTesimonials(res: Response): Promise<any> {
  //   try {
  //     const data = await this.TestimonialModel.find().exec();
  //     if (data.length > 0) {
  //       return res.status(200).json({
  //         success: true,
  //         data: data,
  //         message: 'Testimonial fetched successfully',
  //       });
  //     } else {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'No section Testimonial found',
  //       });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'An error occurred while fetching Testimonial',
  //       error: error.message,
  //     });
  //   }
  // }

  // async deleteTestimonial(id: string, res: Response): Promise<any> {
  //   try {
  //     // First, find the testimonial by ID to retrieve the image details
  //     const testimonial = await this.TestimonialModel.findById(id);
  //     if (!testimonial) {
  //       return res.status(404).json({
  //         success: false,
  //         message: `Testimonial not found with ID: ${id}`,
  //       });
  //     }

  //     // If the testimonial has an associated image, delete it from Cloudinary
  //     if (testimonial.imgPublicID) {
  //       await this.cloudinaryService.deleteImage(testimonial.imgPublicID); // Assuming this method is defined in your Cloudinary service
  //     }

  //     // Now delete the testimonial from the database
  //     await this.TestimonialModel.findByIdAndDelete(id);

  //     return res.status(200).json({
  //       success: true,
  //       message: 'Testimonial deleted successfully',
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'An error occurred while deleting the testimonial',
  //       error: error.message,
  //     });
  //   }
  // }
}
