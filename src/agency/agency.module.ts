import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/common/entities';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { AgencyCategoryController } from './category.controller';
import { AgencyCategoryService } from './category.service';
import { Agency, Contact, LocationEntity, Social, Timeslot } from './entities';
import { AgencyCategory } from './entities/category.entity';
import { AgencyServiceEntity } from './entities/service.entity';
import { AgencySubCategory } from './entities/sub-category';
import { AgencySubCategoryController } from './sub-category.controller';
import { AgencySubCategoryService } from './sub-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agency,
      Contact,
      Social,
      LocationEntity,
      Timeslot,
      AgencyServiceEntity,
      ImageEntity,
      AgencyCategory,
      AgencySubCategory,
    ]),
  ],
  providers: [AgencyService, AgencyCategoryService, AgencySubCategoryService],
  controllers: [
    AgencyController,
    AgencyCategoryController,
    AgencySubCategoryController,
  ],
})
export class AgencyModule {}
