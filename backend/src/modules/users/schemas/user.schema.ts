
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 10 })
  tokenBalance: number;

  @Prop({ default: 'free' })
  status: 'free' | 'pro' | 'enterprise';

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  stripeCustomerId: string;

  @Prop()
  subscriptionId: string;

  @Prop({ type: Date })
  subscriptionEndDate: Date;

  @Prop({ default: 0 })
  totalGenerations: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
