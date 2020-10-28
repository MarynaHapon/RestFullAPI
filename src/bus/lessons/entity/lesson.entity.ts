// Core
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

// App
import { Status } from '../../../common/types';
import { Video } from '../../videos/entity/video.entity';
import { Keynote } from '../../keynotes/entity/keynote.entity';

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

  @Prop({
    _id: Types.ObjectId,
    videos: [{
      type: Types.ObjectId,
      ref: Video.name,
    }],
    keynotes: [{
      type: Types.ObjectId,
      ref: Keynote.name,
    }],
  })
  content?: {
    videos?: string[];
    keynotes?: string[];
  };
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

