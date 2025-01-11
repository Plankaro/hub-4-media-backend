import { Module } from '@nestjs/common';
import { ContactUsPageController } from './contact-us.controller';
import { ContactUsPageService } from './contact-us.service';

@Module({
  controllers: [ContactUsPageController],
  providers: [ContactUsPageService],
})
export class ContactUsPageModule {}
