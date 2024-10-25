import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { AddSectionHeadings, AddHeadingsSchema, HeroHeadings, HeroHeadingsSchema, HowItWorkdata, HowItWorkSchema, Plan, PlanSchema, OfferHeadingsSchema, OfferHeadings } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroHeadings.name, schema: HeroHeadingsSchema },
      { name: HowItWorkdata.name, schema: HowItWorkSchema },
      { name: AddSectionHeadings.name, schema: AddHeadingsSchema }, 
      { name: Plan.name, schema: PlanSchema }, 
      { name: OfferHeadings.name, schema: OfferHeadingsSchema },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
