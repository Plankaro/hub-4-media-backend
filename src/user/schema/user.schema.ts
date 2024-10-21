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

export const UserSchema = SchemaFactory.createForClass(HeroHeadings);

// HowItWorkdata

@Schema()
export class HowItWorkdata extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const HowItWorkSchema = SchemaFactory.createForClass(HowItWorkdata);
