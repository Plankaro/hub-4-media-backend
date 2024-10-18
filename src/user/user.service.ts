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
    @InjectModel("heroheadings")
    private heroHeadlineModel: Model<HeroHeadings>,
    private howItWorkModel:Model<HowItWorkdata>
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

  postHeadlines(CreateUserDto: CreateUserDto) {
    const createdHeroHeading = new this.heroHeadlineModel(CreateUserDto);
    return createdHeroHeading.save();
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
