import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { Agency, Contact, LocationEntity, Social, Timeslot } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agency,
      Contact,
      Social,
      LocationEntity,
      Timeslot,
    ]),
  ],
  providers: [AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
