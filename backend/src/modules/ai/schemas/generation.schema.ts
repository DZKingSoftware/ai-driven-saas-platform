
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GenerationDocument = Generation & Document;

@Schema({ timestamps: true })
export class Generation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  template: string;

  @Prop({ required: true })
  prompt: string;

  @Prop({ type: 'Object' })
  result: {
    text: string;
    model: string;
    tokensUsed: number;
  };

  @Prop({ required: true })
  tokensUsed: number;

  @Prop({ default: 'success' })
  status: 'success' | 'failed' | 'rate_limited';

  @Prop()
  metadata: Record<string, any>;
}

export const GenerationSchema = SchemaFactory.createForClass(Generation);
