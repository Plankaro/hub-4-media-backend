import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  userName?: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;
  @Prop({ default: false })
  emailVerify:boolean;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(Users);

@Schema()
export class VerifyUser extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
}

export const VerifyUserSchema = SchemaFactory.createForClass(VerifyUser);

export type OtpDocument = Otp & Document;

@Schema()
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
