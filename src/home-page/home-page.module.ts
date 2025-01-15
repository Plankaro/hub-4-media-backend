import { Module } from '@nestjs/common';
import { HomePageController } from './home-page.controller';
import { HomePageService } from './home-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  Partners,
  Plans,
  SectionHeadings,
} from './entities';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ImageEntity } from 'src/common/entities';
import { VerifiedAgencies } from './entities/verified-agencies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HeroHeadings,
      HowItWorks,
      SectionHeadings,
      OfferHeadings,
      Plans,
      Partners,
      ImageEntity,
      VerifiedAgencies,
    ]),
    CloudinaryModule,
  ],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
