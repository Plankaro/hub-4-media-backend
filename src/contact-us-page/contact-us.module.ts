import { Module } from '@nestjs/common';
import { ContactUsPageController } from './contact-us.controller';
import { ContactUsPageService } from './contact-us.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDetails } from './contact-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactDetails])],
  controllers: [ContactUsPageController],
  providers: [ContactUsPageService],
})
export class ContactUsPageModule {}
