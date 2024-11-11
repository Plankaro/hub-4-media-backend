import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  AboutOurCompany,
  AddSectionHeadings,
  ContactDetail,
  HeroHeadings,
  HowItWorkdata,
  OfferHeadings,
  OurThreePrinciples,
  Plan,
  Testimonial,
  UserEnquiryData,
  WhayChooseUs,
} from './schema/user.schema';
import { Response } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(HeroHeadings.name)
    private heroHeadlineModel: Model<HeroHeadings>,
    @InjectModel(HowItWorkdata.name)
    private howItWorkModel: Model<HowItWorkdata>,
    @InjectModel(AddSectionHeadings.name)
    private addHeadingsModel: Model<AddSectionHeadings>,
    @InjectModel(Plan.name)
    private PlanSchema: Model<Plan>,
    @InjectModel(OfferHeadings.name)
    private offerHeadingsModel: Model<OfferHeadings>,
    @InjectModel(ContactDetail.name)
    private contactDetailModel: Model<ContactDetail>,
    @InjectModel(UserEnquiryData.name)
    private UserEnquiryDataModel: Model<UserEnquiryData>,
    @InjectModel(AboutOurCompany.name)
    private readonly aboutModelCompany: Model<AboutOurCompany>,
    @InjectModel(OurThreePrinciples.name)
    private readonly ourThreePrinciplesModel: Model<OurThreePrinciples>,
    @InjectModel(WhayChooseUs.name)
    private readonly WhayChooseUsModel: Model<WhayChooseUs>,

    @InjectModel(Testimonial.name)
    private readonly TestimonialModel: Model<Testimonial>,

    private readonly cloudinaryService: CloudinaryService,

    // WhayChooseUs
  ) {}

  async postHeadlines(CreateUserDto: CreateUserDto) {
    const createdHeroHeading = await new this.heroHeadlineModel(CreateUserDto);
    return createdHeroHeading.save();
  }

  async updateHeroHeadings(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      // Find the document by ID and update it with new data
      const updatedData = await this.heroHeadlineModel.findOneAndUpdate(
        { _id: id }, // Filter by ID
        updateUserDto, // Data to update
        { new: true }, // Return the updated document
      );

      if (!updatedData) {
        // If no document was found with the provided ID
        return {
          success: false,
          message: `Hero heading not found with ID: ${id}`,
        };
      }

      // Success response
      return {
        data: updatedData,
        success: true,
        message: 'Hero heading updated successfully',
      };
    } catch (error) {
      // Error handling for unexpected issues
      return {
        success: false,
        message: 'An error occurred while updating hero heading data',
        error: error.message,
      };
    }
  }

  async findHeroHeadings(res: Response): Promise<any> {
    const data = await this.heroHeadlineModel.find().exec();
    if (data) {
      res.status(200).json({
        data: data,
        success: true,
        message: 'user data fetch success',
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: 'user data not avilable' });
    }
  }

  async postHowItWorks(CreateUserDto: CreateUserDto) {
    const createdHeroHeading = await new this.howItWorkModel(CreateUserDto);
    return createdHeroHeading.save();
  }

  async updateHowItWorks(
    id: string,
    updateUserDto: UpdateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      // Find the document by ID and update it with new data
      const updatedData = await this.howItWorkModel.findOneAndUpdate(
        { _id: id }, // Filter by ID
        updateUserDto, // Data to update
        { new: true }, // Return the updated document
      );

      if (!updatedData) {
        // If no document was found with the provided ID
        return res.status(404).json({
          success: false,
          message: `How It Works data not found with ID: ${id}`,
        });
      }

      // Success response
      return res.status(200).json({
        data: updatedData,
        success: true,
        message: 'How It Works data updated successfully',
      });
    } catch (error) {
      // Error handling for unexpected issues
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating How It Works data',
        error: error.message,
      });
    }
  }

  async findHowitWorkData(res: Response): Promise<any> {
    const data = await this.howItWorkModel.find().exec();
    if (data) {
      res.status(200).json({
        data: data,
        success: true,
        message: 'user data fetch success',
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: 'user data not avilable' });
    }
  }

  async addSectionHeadings(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const createdSectionHeading = new this.addHeadingsModel(createUserDto);
      const savedData = await createdSectionHeading.save();
      return res.status(201).json({
        success: true,
        data: savedData,
        message: 'Section heading added successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while adding section heading',
        error: error.message,
      });
    }
  }

  async updateSectionHeadings(id: string, updateUserDto: any): Promise<any> {
    console.log('data get>>>>>>>>>>>>>>>>', id, updateUserDto);
    try {
      const updatedHeading = await this.addHeadingsModel.findOneAndUpdate(
        { _id: id }, // Filter by ID
        updateUserDto, // Data to update
        { new: true }, // Return the updated document
      );
      console.log('updatedHeading>><<', updatedHeading);
      if (!updatedHeading) {
        return {
          success: false,
          message: `AddHeadings not found with ID: ${id}`,
        };
      }

      return {
        data: updatedHeading,
        success: true,
        message: 'AddHeadings updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating AddHeadings data',
        error: error.message,
      };
    }
  }

  async findSectionHeadings(res: Response): Promise<any> {
    try {
      const data = await this.addHeadingsModel.find().exec();
      if (data.length > 0) {
        return res.status(200).json({
          success: true,
          data: data,
          message: 'Section headings fetched successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'No section headings found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching section headings',
        error: error.message,
      });
    }
  }

  async findSectionHeadingByName(
    sectionName: string,
    res: Response,
  ): Promise<any> {
    try {
      const data = await this.addHeadingsModel.findOne({ sectionName }).exec();
      if (data) {
        return res.status(200).json({
          success: true,
          data: data,
          message: `Section heading for '${sectionName}' fetched successfully`,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `No section heading found for '${sectionName}'`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `An error occurred while fetching the section heading for '${sectionName}'`,
        error: error.message,
      });
    }
  }

  async addPrisePlane(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const createdSectionHeading = new this.PlanSchema(createUserDto);
      const savedData = await createdSectionHeading.save();
      return res.status(201).json({
        success: true,
        data: savedData,
        message: 'Section Price Plane added successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while adding Price Plane',
        error: error.message,
      });
    }
  }

  async findPrisePlane(res: Response): Promise<any> {
    try {
      const data = await this.PlanSchema.find().exec();
      if (data.length > 0) {
        return res.status(200).json({
          success: true,
          data: data,
          message: 'Prise Planes fetched successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'No Prise Planes found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching Prise Planes',
        error: error.message,
      });
    }
  }

  async updatePrisePlane(
    id: string,
    updateUserDto: UpdateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      // Find the price plan by ID and update it with new data
      const updatedPlan = await this.PlanSchema.findOneAndUpdate(
        { _id: id }, // Filter by ID
        updateUserDto, // Data to update
        { new: true }, // Return the updated document
      );

      if (!updatedPlan) {
        // If no price plan was found with the provided ID
        return res.status(404).json({
          success: false,
          message: `Price plan not found with ID: ${id}`,
        });
      }

      // Success response
      return res.status(200).json({
        data: updatedPlan,
        success: true,
        message: 'Price plan updated successfully',
      });
    } catch (error) {
      // Error handling for unexpected issues
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating price plan',
        error: error.message,
      });
    }
  }

  async deletePrisePlane(id: string, res: Response): Promise<any> {
    try {
      const deletedPlan = await this.PlanSchema.findByIdAndDelete({ _id: id });

      if (!deletedPlan) {
        return res.status(404).json({
          success: false,
          message: `Price plan not found with ID: ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Price plan deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while deleting price plan',
        error: error.message,
      });
    }
  }

  async addOfferHeadings(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const createdOfferHeading = new this.offerHeadingsModel(createUserDto);
      const savedData = await createdOfferHeading.save();
      return res.status(201).json({
        success: true,
        data: savedData,
        message: 'Offer heading added successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while adding offer heading',
        error: error.message,
      });
    }
  }

  async updateOfferHeadings(
    id: string,
    updateUserDto: UpdateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const updatedHeading = await this.offerHeadingsModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      );

      if (!updatedHeading) {
        return res.status(404).json({
          success: false,
          message: `Offer heading not found with ID: ${id}`,
        });
      }

      return res.status(200).json({
        data: updatedHeading,
        success: true,
        message: 'Offer heading updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating offer heading',
        error: error.message,
      });
    }
  }

  async findOfferHeadings(res: Response): Promise<any> {
    try {
      const data = await this.offerHeadingsModel.find().exec();
      if (data.length > 0) {
        return res.status(200).json({
          success: true,
          data: data,
          message: 'Offer headings fetched successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'No offer headings found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching offer headings',
        error: error.message,
      });
    }
  }

  async deleteOfferHeadings(id: string, res: Response): Promise<any> {
    try {
      const deletedHeading = await this.offerHeadingsModel.findByIdAndDelete({
        _id: id,
      });

      if (!deletedHeading) {
        return res.status(404).json({
          success: false,
          message: `Offer heading not found with ID: ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Offer heading deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while deleting offer heading',
        error: error.message,
      });
    }
  }

  async createContactDetail(createContactDto: CreateUserDto): Promise<any> {
    const createdContact = new this.contactDetailModel(createContactDto);
    await createdContact.save();
    return { success: true, message: 'Contact details saved successfully' };
  }

  async getContactDetails(): Promise<any> {
    try {
      const contacts = await this.contactDetailModel.find().exec();

      return {
        success: true,
        message: 'Contact details retrieved successfully',
        data: contacts,
      };
    } catch (error) {
      return { success: false, message: 'Failed to retrieve contact details' };
    }
  }

  async updateContactDetail(
    id: string,
    updateContactDto: Partial<CreateUserDto>,
    file?: Express.Multer.File,
  ): Promise<any> {
    try {
      // Find the existing testimonial to check for the existing image
      const existingTestimonial = await this.contactDetailModel.findById(id);

      if (!existingTestimonial) {
        return {
          success: false,
          message: `Contact data not found with ID: ${id}`,
        };
      }

      // If an image is provided and there was a previous image, delete the old image
      let img = '';
      let imgPublicID = '';
      if (file) {
        // Delete the old image if it exists
        if (existingTestimonial.imgPublicID) {
          await this.cloudinaryService.deleteImage(
            existingTestimonial.imgPublicID,
          );
        }

        // Upload the new image to Cloudinary
        const result = await this.cloudinaryService.uploadImage(file);
        img = result.secure_url;
        imgPublicID = result.public_id;
      }

      // Update the testimonial with new data and image information
      const updatedContactModal =
        await this.contactDetailModel.findOneAndUpdate(
          { _id: id }, // Filter by ID
          {
            ...updateContactDto,
            ...(file ? { img, imgPublicID } : {}),
          },
          { new: true }, // Return the updated document
        );

      return {
        data: updatedContactModal,
        success: true,
        message: 'contact updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating contact details data',
        error: error.message,
      };
    }
  }

  async submitForm(formDto: CreateUserDto): Promise<any> {
    try {
      const formSubmission = new this.UserEnquiryDataModel(formDto);
      await formSubmission.save();
      return { success: true, message: 'Form submitted successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to submit form' };
    }
  }

  async createAbout(data: {
    heading: string;
    descriptionOne: string;
    descriptionTwo: string;
    sideText: string;
  }) {
    try {
      const aboutData = new this.aboutModelCompany(data);
      await aboutData.save();
      return {
        success: true,
        message: 'About our company information submitted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit about our company information',
        error: error.message,
      };
    }
  }

  async updateAbout(
    id: string,
    updateAboutDto: Partial<CreateUserDto>,
    file?: Express.Multer.File,
  ) {
    try {
      // Find the existing testimonial to check for the existing image
      const existingData = await this.aboutModelCompany.findById(id);

      if (!existingData) {
        return {
          success: false,
          message: `About Data not found with ID: ${id}`,
        };
      }

      // If an image is provided and there was a previous image, delete the old image
      let img = '';
      let imgPublicID = '';
      if (file) {
        // Delete the old image if it exists
        if (existingData.imgPublicID) {
          await this.cloudinaryService.deleteImage(existingData.imgPublicID);
        }

        // Upload the new image to Cloudinary
        const result = await this.cloudinaryService.uploadImage(file);
        img = result.secure_url;
        imgPublicID = result.public_id;
      }

      // Update the testimonial with new data and image information
      const updatedData = await this.aboutModelCompany.findOneAndUpdate(
        { _id: id }, // Filter by ID
        {
          ...updateAboutDto,
          ...(file ? { img, imgPublicID } : {}),
        },
        { new: true }, // Return the updated document
      );

      return {
        data: updatedData,
        success: true,
        message: 'contact updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating contact details data',
        error: error.message,
      };
    }
  }

  async getAbouOurCompany(): Promise<any> {
    try {
      const data = await this.aboutModelCompany.find().exec();

      return {
        success: true,
        message: 'about our company  retrieved successfully',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve about our company',
      };
    }
  }

  async addOurThreePrinciples(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const createdPrinciple = new this.ourThreePrinciplesModel(createUserDto);
      const savedData = await createdPrinciple.save();
      return res.status(201).json({
        success: true,
        data: savedData,
        message: 'Our Three Principles added successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while adding Our Three Principles',
        error: error.message,
      });
    }
  }

  // Update OurThreePrinciples
  async updateOurThreePrinciples(
    id: string,
    updateUserDto: UpdateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const updatedPrinciple =
        await this.ourThreePrinciplesModel.findOneAndUpdate(
          { _id: id },
          updateUserDto,
          { new: true },
        );

      if (!updatedPrinciple) {
        return res.status(404).json({
          success: false,
          message: `Our Three Principles not found with ID: ${id}`,
        });
      }

      return res.status(200).json({
        data: updatedPrinciple,
        success: true,
        message: 'Our Three Principles updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating Our Three Principles',
        error: error.message,
      });
    }
  }

  // Get OurThreePrinciples
  async getOurThreePrinciples(res: Response): Promise<any> {
    try {
      const data = await this.ourThreePrinciplesModel.find().exec();
      if (data.length > 0) {
        return res.status(200).json({
          success: true,
          data: data,
          message: 'Our Three Principles fetched successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'No Our Three Principles found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching Our Three Principles',
        error: error.message,
      });
    }
  }

  //whaychoose us

  async addOurWhayChooseUs(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const createdPrinciple = new this.WhayChooseUsModel(createUserDto);
      const savedData = await createdPrinciple.save();
      return res.status(201).json({
        success: true,
        data: savedData,
        message: 'Our Three Principles added successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while adding Our Three Principles',
        error: error.message,
      });
    }
  }

  async updateWhayChooseUs(
    id: string,
    updateWhayChooseUsDTO: CreateUserDto,
    file?: Express.Multer.File,
  ): Promise<any> {
   
    try {
      const existingData = await this.WhayChooseUsModel.findById(id);
      console.log('existing>>>>>>', existingData);

      if (!existingData) {
        return {
          success: false,
          message: `About Data not found with ID: ${id}`,
        };
      }

      let img = '';
      let imgPublicID = '';
      if (file) {
        // Delete the old image if it exists
        if (existingData.imgPublicID) {
          await this.cloudinaryService.deleteImage(existingData.imgPublicID);
        }

        const result = await this.cloudinaryService.uploadImage(file);
        img = result.secure_url;
        imgPublicID = result.public_id;
      }

      const updatedData = await this.WhayChooseUsModel.findOneAndUpdate(
        { _id: id },
        {
          ...updateWhayChooseUsDTO,
          ...(file ? { img, imgPublicID } : {}),
        },
        { new: true },
      );

      return {
        data: updatedData,
        success: true,
        message: 'whay choose us updated successfully',
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: 'An error occurred while updating whaychoose us details data',
        error: error.message,
      };
    }
  }

  async getWhayChooseUs(res: Response): Promise<any> {
    try {
      const data = await this.WhayChooseUsModel.find().exec();
      if (data.length > 0) {
        return res.status(200).json({
          success: true,
          data: data,
          message: 'Our Three Principles fetched successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'No Our Three Principles found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching Our Three Principles',
        error: error.message,
      });
    }
  }

  //tesitmonials
  async uploadUserImage(file: Express.Multer.File): Promise<any> {
    console.log('file>><<', file);
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      console.log('your_public_id_here', result);
      return {
        success: true,
        imageUrl: result.secure_url,
      };
    } catch (error) {
      return { success: false, message: 'Image upload failed' };
    }
  }
  async addTesimonials(
    createUserDto: CreateUserDto,
    res: Response,
    file?: Express.Multer.File,
  ): Promise<any> {
    try {
      let profilePictureUrl = '';
      let imgPublicID = '';

      // If a file is provided, upload it to Cloudinary
      if (file) {
        const result = await this.cloudinaryService.uploadImage(file);
        profilePictureUrl = result.secure_url;
        imgPublicID = result.public_id;
      }

      // Create the testimonial with or without image data
      const testimonialData = {
        ...createUserDto,
        profilePictureUrl,
        imgPublicID,
      };
      const createdTestimonial = new this.TestimonialModel(testimonialData);
      const savedData = await createdTestimonial.save();

      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: savedData,
        message: 'Testimonial added successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred while adding Testimonial',
        error: error.message,
      });
    }
  }

  async updateTesimonials(
    id: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File, // Include the file parameter
  ): Promise<any> {
    try {
      // Find the existing testimonial to check for the existing image
      const existingTestimonial = await this.TestimonialModel.findById(id);

      if (!existingTestimonial) {
        return {
          success: false,
          message: `Testimonial not found with ID: ${id}`,
        };
      }

      // If an image is provided and there was a previous image, delete the old image
      let profilePictureUrl = '';
      let imgPublicID = '';
      if (file) {
        // Delete the old image if it exists
        if (existingTestimonial.imgPublicID) {
          await this.cloudinaryService.deleteImage(
            existingTestimonial.imgPublicID,
          );
        }

        // Upload the new image to Cloudinary
        const result = await this.cloudinaryService.uploadImage(file);
        profilePictureUrl = result.secure_url;
        imgPublicID = result.public_id;
      }

      // Update the testimonial with new data and image information
      const updatedTestimonialModel =
        await this.TestimonialModel.findOneAndUpdate(
          { _id: id }, // Filter by ID
          {
            ...updateUserDto,
            ...(file ? { profilePictureUrl, imgPublicID } : {}), // Update image fields only if a file is provided
          },
          { new: true }, // Return the updated document
        );

      return {
        data: updatedTestimonialModel,
        success: true,
        message: 'Testimonial updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating Testimonial data',
        error: error.message,
      };
    }
  }

  // async updateTesimonials(
  //   id: string,
  //   updateUserDto: UpdateUserDto,

  // ): Promise<any> {
  //   try {
  //     const updatedTestimonialModel =
  //       await this.TestimonialModel.findOneAndUpdate(
  //         { _id: id }, // Filter by ID
  //         updateUserDto, // Data to update
  //         { new: true }, // Return the updated document
  //       );

  //     if (!updatedTestimonialModel) {
  //       return {
  //         success: false,
  //         message: `Testimonial not found with ID: ${id}`,
  //       };
  //     }

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

  async findTesimonials(res: Response): Promise<any> {
    try {
      const data = await this.TestimonialModel.find().exec();
      if (data.length > 0) {
        return res.status(200).json({
          success: true,
          data: data,
          message: 'Testimonial fetched successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'No section Testimonial found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching Testimonial',
        error: error.message,
      });
    }
  }

  async deleteTestimonial(id: string, res: Response): Promise<any> {
    try {
      // First, find the testimonial by ID to retrieve the image details
      const testimonial = await this.TestimonialModel.findById(id);
      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message: `Testimonial not found with ID: ${id}`,
        });
      }

      // If the testimonial has an associated image, delete it from Cloudinary
      if (testimonial.imgPublicID) {
        await this.cloudinaryService.deleteImage(testimonial.imgPublicID); // Assuming this method is defined in your Cloudinary service
      }

      // Now delete the testimonial from the database
      await this.TestimonialModel.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the testimonial',
        error: error.message,
      });
    }
  }
}
