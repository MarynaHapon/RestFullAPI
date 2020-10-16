// Core
import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// App
import { Status } from '../../../common/types';

class LessonMedia extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  uri: string;
}

class Content extends Document {
  @Prop({ required: true })
  videos: LessonMedia[];

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

  @Prop(raw({
    videos: { type: Array },
    keynotes: { type: Array },
  }))
  content?: Record<string, any>;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

