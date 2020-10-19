// Core
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// App
import { Status } from '../../../common/types';
import { ValidateNested } from 'class-validator';

class LessonMedia {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  uri: string;
}

class Content {
  @Prop({ required: true })
  @ValidateNested()
  videos: LessonMedia[];

  @ValidateNested()
  @Prop({ required: true })
  keynotes: LessonMedia[];
}

@Schema()
export class Lesson extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  availability: Status;

  content?: Content;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

