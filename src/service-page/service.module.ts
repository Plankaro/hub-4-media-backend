import { Module } from '@nestjs/common';
import { ServicePageService } from './services/service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ExtraService,
  Service,
  ServiceCategory,
  ServiceSubCategory,
  TimeSlot,
} from './entities';
import { ImageEntity } from 'src/common/entities';
import { ServiceCategoryService } from './services';
import {
  ServiceCategoryController,
  ServicePageController,
} from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCategory,
      ImageEntity,
      Service,
      ServiceSubCategory,
      TimeSlot,
      ExtraService,
    ]),
  ],
  controllers: [ServicePageController, ServiceCategoryController],
  providers: [ServicePageService, ServiceCategoryService],
})
export class ServicePageModule {}
