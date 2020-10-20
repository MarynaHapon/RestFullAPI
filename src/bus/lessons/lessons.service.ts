// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

// App
import { Lesson } from './entity/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Video } from '../../common/entities/video.entity';
import { Keynote } from '../../common/entities/keynote.entity';
import { AddVideoDto } from './dto/add-video.dto';

@Injectable()
export class LessonsService {
  constructor(
    // @InjectConnection() private readonly connection: Connection,
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
    @InjectModel(Keynote.name) private readonly keynoteModel: Model<Keynote>,
  ) {}

  getAll(
    paginationQuery: PaginationQueryDto
  ) {
    const { limit, page } = paginationQuery;
    return this.lessonModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  async create(
    createLessonDto: CreateLessonDto,
  ) {
    // createLessonDto.content.videos.map(async (addVideoDto: AddVideoDto) => {
    //   await this.addVideo(addVideoDto)
    // });

    // const session = await this.connection.startSession();
    // session.startTransaction();
    //
    // try {
    //   const createdVideo = new this.videoModel(addVideoDto);
    //   createdVideo.save({ session });
    //
    //   await session.commitTransaction();
    // } catch (err) {
    //   await session.abortTransaction();
    // } finally {
    //   session.endSession();
    // }

    const lesson = new this.lessonModel(createLessonDto);
    return lesson.save();
  }

  async getById(
    lessonHash: string,
  ) {
    let lesson;

    try {
      lesson = await this.lessonModel
        .findOne({ _id: lessonHash })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!lesson) {
      throw new NotFoundException(`Lesson "${lessonHash}" not found`);
    }

    return lesson;
  }

  async update(
    lessonHash: string,
    updateLessonDto: UpdateLessonDto,
  ) {
    let existingLesson;

    try {
      existingLesson = await this.lessonModel
        .findOneAndUpdate({ _id: lessonHash }, { $set: updateLessonDto }, { new: true })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingLesson) {
      throw new NotFoundException(`Lesson "${lessonHash}" not found`)
    }

    return existingLesson;
  }

  async remove(
    lessonHash: string,
  ) {
    const existingLesson = await this.getById(lessonHash);
    return existingLesson.remove();
  }

  async addVideo(
    lessonHash: string,
    addVideoDto: any,
  ) {
    const lesson = new this.videoModel(addVideoDto);
    return lesson.save()
    // return lesson._id;
  }

  playVideo(
    param,
  ) {
    return param;
  }

  removeVideo(
    param,
  ) {
    return param;
  }

  addKeynote(
    lessonHash: string,
    addKeynoteDto: any,
  ) {
    const lesson = new this.videoModel(addKeynoteDto);
    return lesson.save();
  }

  getKeynote(
    param,
  ) {
    let keynote;

    if (!keynote) {
      throw new NotFoundException(`Keynote "${param}" not found`);
    }

    return param;
  }

  removeKeynote(
    param,
  ) {
    return param;
  }
}
