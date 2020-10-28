// Core
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

// App
import { Status } from '../../../common/types';
import { Video } from '../../videos/entity/video.entity';
import { Keynote } from '../../keynotes/entity/keynote.entity';

class ContentDto {
  @Prop([{
    _id: mongoose.Schema.Types.ObjectId,
    lessonHash: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Video.name,
    },
  }])
  readonly videos?: [];

  @Prop([{
    _id: mongoose.Schema.Types.ObjectId,
    lessonHash: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Keynote.name,
    },
  }])
  readonly keynotes?: [];
}

export class CreateLessonDto {
  @ApiProperty({
    example: 'Backend'
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Backend Online Course'
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 5,
  })
  @IsPositive()
  readonly order: number;

  @ApiProperty({
    example: Status.select,
  })
  @IsEnum(Status)
  readonly availability: Status;

  @IsObject()
  @IsOptional()
  readonly content?: ContentDto;
}
