import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { AddSectionHeadings, AddHeadingsSchema, HeroHeadings, HeroHeadingsSchema, HowItWorkdata, HowItWorkSchema, Plan, PlanSchema, OfferHeadingsSchema, OfferHeadings, ContactDetailSchema, ContactDetail, UserEnquiryDataSchema, UserEnquiryData, AboutOurCompanySchema, AboutOurCompany, OurThreePrinciples, OurThreePrinciplesSchema, WhayChooseUsSchema, WhayChooseUs, TestimonialSchema, Testimonial } from './schema/user.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroHeadings.name, schema: HeroHeadingsSchema },
      { name: HowItWorkdata.name, schema: HowItWorkSchema },
      { name: AddSectionHeadings.name, schema: AddHeadingsSchema }, 
      { name: Plan.name, schema: PlanSchema }, 
      { name: OfferHeadings.name, schema: OfferHeadingsSchema },
      { name: ContactDetail.name, schema: ContactDetailSchema },
      { name: UserEnquiryData.name, schema: UserEnquiryDataSchema },
      { name: AboutOurCompany.name, schema: AboutOurCompanySchema },
      { name: OurThreePrinciples.name, schema: OurThreePrinciplesSchema },
      { name: WhayChooseUs.name, schema: WhayChooseUsSchema },
      { name: Testimonial.name, schema: TestimonialSchema },

     
    ]),
    AuthModule,
    MulterModule.register({
      dest: './uploads', // Ensure this directory is set correctly
    }),

  ],
  controllers: [UserController],
  providers: [UserService,CloudinaryService],
})
export class UserModule {}
