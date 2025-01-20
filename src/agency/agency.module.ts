import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { Agency, Contact, LocationEntity, Social, Timeslot } from './entities';
import { AgencyServiceEntity } from './entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agency,
      Contact,
      Social,
      LocationEntity,
      Timeslot,
      AgencyServiceEntity,
    ]),
  ],
  providers: [AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
