import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {  AdminSchema } from './schema/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HeroHeadings', schema: AdminSchema }]), // Register the Admin schema here
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
