// Core
import { Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  uri: string;
}
