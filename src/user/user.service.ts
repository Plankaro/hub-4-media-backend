import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HeroHeadings, HowItWorkdata } from './schema/user.schema';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(HeroHeadings.name)
    private heroHeadlineModel: Model<HeroHeadings>,
    @InjectModel(HowItWorkdata.name)
    private howItWorkModel: Model<HowItWorkdata>
  ) { }
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

  async updateHeroHeadings(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      // Find the document by ID and update it with new data
      const updatedData = await this.heroHeadlineModel.findOneAndUpdate(
        { _id: id }, // Filter by ID
        updateUserDto, // Data to update
        { new: true }, // Return the updated document
      );
  
      if (!updatedData) {
        // If no document was found with the provided ID
        return { success: false, message: `Hero heading not found with ID: ${id}` };
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
      res
        .status(200)
        .json({
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

  
  async updateHowItWorks(id: string, updateUserDto: UpdateUserDto, res: Response): Promise<any> {
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
      res
        .status(200)
        .json({
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
}
