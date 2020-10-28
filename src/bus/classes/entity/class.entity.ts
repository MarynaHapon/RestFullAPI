// Core
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// App
import { Status } from '../../../common/types';
import { User } from '../../users/entity/user.entity';
import { Lesson } from '../../lessons/entity/lesson.entity';

@Schema()
class Duration {
  @ApiProperty({
    example: '2020-10-17T19:00:16.634Z',
  })
  @Prop({ required: true })
  started: Date;

  @ApiProperty({
    example: '2020-10-17T19:00:16.634Z',
  })
  @Prop({ required: true })
  closed: Date;
}

@Schema()
export class Class extends Document {
  @ApiProperty({
    example: 'Backend',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Backend Online Course',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: 2,
  })
  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  @IsObject()
  duration: Duration;

  @Prop([{
    _id: Types.ObjectId,
    user: {
      type: Types.ObjectId,
      ref: User.name,
    },
    status: String,
    notes: String,
  }])
  students: {
    user: string;
    status: Status;
    notes: string;
  }[];

  @Prop({
    type: [{
      type: Types.ObjectId,
      ref: Lesson.name,
    }]
  })
  lessons: string[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
