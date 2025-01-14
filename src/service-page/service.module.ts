import { forwardRef, Module } from '@nestjs/common';
import { ServicePageService } from './services/service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ExtraService,
  Service,
  ServiceCategory,
  ServiceSubCategory,
  TimeSlot,
  TimeSlotsOfDay,
} from './entities';
import { ImageEntity } from 'src/common/entities';
import { ServiceCategoryService, ServiceSubCategoryService } from './services';
import {
  ServiceCategoryController,
  ServicePageController,
} from './controllers';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UsersModule } from 'src/users/users.module';
import { ServiceSubCategoryController } from './controllers/sub-category.controller';
import { ServicePricing } from './entities/pricing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCategory,
      ImageEntity,
      Service,
      ServiceSubCategory,
      TimeSlot,
      TimeSlotsOfDay,
      ExtraService,
      ServicePricing,
    ]),
    forwardRef(() => UsersModule),
    CloudinaryModule,
  ],
  controllers: [
    ServicePageController,
    ServiceCategoryController,
    ServiceSubCategoryController,
  ],
  providers: [
    ServicePageService,
    ServiceCategoryService,
    ServiceSubCategoryService,
  ],
})
export class ServicePageModule {}
