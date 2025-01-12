import { Module } from '@nestjs/common';
import { ContactUsPageController } from './contact-us.controller';
import { ContactUsPageService } from './contact-us.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDetails } from './entities/contact-details.entity';
import { UserEnquiry } from './entities/user-enquiry.entity';
import { ImageEntity } from 'src/common/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactDetails, UserEnquiry, ImageEntity]),
  ],
  controllers: [ContactUsPageController],
  providers: [ContactUsPageService],
})
export class ContactUsPageModule {}
