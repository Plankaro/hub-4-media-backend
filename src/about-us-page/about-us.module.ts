import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/common/entities';
import { OurThreePrinciples } from './entities/our-three-principles.entity';
import { AboutOurCompany } from './entities/about-our-company.entity';
import { AboutUsPageService } from './about-us.service';
import { AboutUsPageController } from './about-us.controller';
import { Testimonials } from './entities/testimonials.entity';
import { WhyChooseUs } from './entities/why-choose-us.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ImageEntity,
      OurThreePrinciples,
      AboutOurCompany,
      Testimonials,
      WhyChooseUs,
    ]),
  ],
  controllers: [AboutUsPageController],
  providers: [AboutUsPageService],
})
export class AboutUsPageModule {}
