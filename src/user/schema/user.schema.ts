// src/admin/schema/admin.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type AdminDocument = Admin & Document;

@Schema()
export class HeroHeadings extends Document {
  @Prop({ required: true })
  firstHeading: string;

  @Prop({ type: [String], required: true })
  secondHeading: string[];

  @Prop({ required: true })
  thirdHeading: string;
}

export const HeroHeadingsSchema = SchemaFactory.createForClass(HeroHeadings);

// HowItWorkdata

@Schema()
export class HowItWorkdata extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const HowItWorkSchema = SchemaFactory.createForClass(HowItWorkdata);

@Schema()
export class AddSectionHeadings extends Document {
  @Prop({ required: false })
  sectionName: string;

  @Prop({ required: true })
  heading: string;

  @Prop({ required: false })
  subheading?: string;
}

export const AddHeadingsSchema =
  SchemaFactory.createForClass(AddSectionHeadings);

@Schema()
export class Plan extends Document {
  @Prop({ required: true })
  plane: string;

  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  line: string;

  @Prop({ required: true })
  free: boolean;
  @Prop({ required: true })
  slogan: string;

  @Prop()
  amount?: number;

  @Prop({ type: [String], required: true })
  services: string[];
}

export const PlanSchema = SchemaFactory.createForClass(Plan);

@Schema()
export class OfferHeadings extends Document {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  subheading: string;

  @Prop({ required: true })
  description: string; // Add image URL if necessary

  // Add other properties as required
}

export const OfferHeadingsSchema = SchemaFactory.createForClass(OfferHeadings);

@Schema()
export class ContactDetail extends Document {
  @Prop({ required: true })
  phonNumber: string;

  @Prop({ required: false })
  extraPhonNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  extraEmail: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  googelMapLocation: string;
  @Prop({ required: false, default: '' })
  img: string;

  @Prop({ required: false, default: '' })
  imgPublicID: string;
}

export const ContactDetailSchema = SchemaFactory.createForClass(ContactDetail);

@Schema({ timestamps: true })
export class UserEnquiryData extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  message: string;
}

export const UserEnquiryDataSchema =
  SchemaFactory.createForClass(UserEnquiryData);

@Schema({ timestamps: true })
export class AboutOurCompany extends Document {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  descriptionOne: string;

  @Prop({ required: false })
  descriptionTwo: string;

  @Prop({ required: true })
  sideText: string;
  @Prop({ required: false, default: '' })
  img: string;

  @Prop({ required: false, default: '' })
  imgPublicID: string;
}

export const AboutOurCompanySchema =
  SchemaFactory.createForClass(AboutOurCompany);

@Schema()
export class OurThreePrinciples {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  subHeading: string;

  @Prop({
    type: [{ icon: String, heading: String, subheading: String }],
    required: false,
  })
  cards: { icon?: string; heading: string; subheading: string }[];
}

export const OurThreePrinciplesSchema =
  SchemaFactory.createForClass(OurThreePrinciples);

@Schema()
export class WhayChooseUs {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  subHeading: string;

  @Prop({
    type: [{ heading: String, description: String }],
    required: false,
  })
  cards: { heading: string; description: string }[];
  
  @Prop({ required: false, default: '' })
  img: string;

  @Prop({ required: false, default: '' })
  imgPublicID: string;
}

export const WhayChooseUsSchema = SchemaFactory.createForClass(WhayChooseUs);

@Schema()
export class Testimonial extends Document {
  @Prop({ required: false, default: '' })
  profilePictureUrl: string;

  @Prop({ required: false, default: '' })
  imgPublicID: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  designation: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
