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
  @Prop({ required: true })
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
