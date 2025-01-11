import { Module } from '@nestjs/common';
import { HomePageController } from './home-page.controller';
import { HomePageService } from './home-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AboutOurCompany,
  ContactDetails,
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  OurThreePrinciples,
  Plans,
  SectionHeadings,
  Testimonials,
  UserEnquiry,
  WhyChooseUs,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HeroHeadings,
      HowItWorks,
      SectionHeadings,
      Testimonials,
      WhyChooseUs,
      OurThreePrinciples,
      AboutOurCompany,
      UserEnquiry,
      ContactDetails,
      OfferHeadings,
      Plans,
    ]),
  ],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
