// Core
import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
class Duration extends Document {
  @Prop({ required: true })
  started: string;

  @Prop({ required: true })
  closed: string;
}

@Schema()
export class Class extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  @Prop(raw({
    started: { type: String },
    closed: { type: String }
  }))
  duration: Record<string, any>;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
