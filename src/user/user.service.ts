import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  AddSectionHeadings,
  HeroHeadings,
  HowItWorkdata,
  OfferHeadings,
  Plan,
} from './schema/user.schema';
import { Response } from 'express';

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
    @InjectModel(OfferHeadings.name) // Inject OfferHeadings model
    private offerHeadingsModel: Model<OfferHeadings>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

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

  async updateSectionHeadings(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      const updatedHeading = await this.addHeadingsModel.findOneAndUpdate(
        { _id: id }, // Filter by ID
        updateUserDto, // Data to update
        { new: true }, // Return the updated document
      );

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

  async updatePrisePlane(id: string, updateUserDto: UpdateUserDto, res: Response): Promise<any> {
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
      const deletedPlan = await this.PlanSchema.findByIdAndDelete({_id:id});
  
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


  async addOfferHeadings(createUserDto: CreateUserDto, res: Response): Promise<any> {
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

  async updateOfferHeadings(id: string, updateUserDto: UpdateUserDto, res: Response): Promise<any> {
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
      const deletedHeading = await this.offerHeadingsModel.findByIdAndDelete({ _id: id });

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
}
  
  

