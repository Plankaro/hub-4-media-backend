import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { HeroHeadings } from 'src/schemas/coman.schema';


@Injectable()
export class AdminService {

  constructor(
    @InjectModel(HeroHeadings.name) private adminModel: Model<HeroHeadings>, 
  ) {}
  create(CreateAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  postHeadlines(createAdminDto: CreateAdminDto){
    const createdAdmin = new this.adminModel(createAdminDto);
    return createdAdmin.save();
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
