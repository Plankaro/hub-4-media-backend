import { Module } from '@nestjs/common';
import { ContactUsPageController } from './contact-us.controller';
import { ContactUsPageService } from './contact-us.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDetails } from './entities/contact-details.entity';
import { UserEnquiry } from './entities/user-enquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactDetails, UserEnquiry])],
  controllers: [ContactUsPageController],
  providers: [ContactUsPageService],
})
export class ContactUsPageModule {}
