// Core
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

// App
import { Lesson } from './entity/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { AddVideoDto } from './dto/add-video.dto';
import { AddKeynoteDto } from './dto/add-keynote.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
  ) {}

  getAll(
    paginationQuery: PaginationQueryDto
  ) {
    const { limit, page } = paginationQuery;
    return this.lessonModel
      .find()
      .skip(page)
      .limit(limit)
      .populate('content.videos')
      .populate('content.keynotes')
      .exec();
  }

  async create(
    createLessonDto: CreateLessonDto,
  ) {
    const lesson = new this.lessonModel(createLessonDto);
    lesson.save();
    return { hash: lesson._id }
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
    existingLesson.remove();
  }

  async addVideo(
    lessonHash: string,
    addVideoDto: AddVideoDto,
  ) {
    const existingLesson = await this.getById(lessonHash);

    const existingVideo = existingLesson.content.videos
      .find(video => String(video.videoHash) === addVideoDto.videoHash);

    if (existingVideo) {
      throw new ConflictException(`addVideo: Video ${addVideoDto.videoHash} already exist`);
    }

    existingLesson.content.videos.push(addVideoDto.videoHash);
    existingLesson.save();
  }

  async getVideo(
    lessonHash: string,
    videoHash: string,
  ) {
    let existingLesson;

    try {
      existingLesson = await this.lessonModel
        .findOne({ _id: lessonHash })
        .populate('content.videos')
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingLesson) {
      throw new NotFoundException(`getVideo: Lesson "${lessonHash}" not found`);
    }

    const existingVideo = existingLesson.content.videos
      .find(video => String(video._id) === videoHash);

    if (!existingVideo) {
      throw new NotFoundException(`getVideo: Video "${videoHash}" not found`);
    }

    return existingVideo;
  }

  async removeVideo(
    lessonHash: string,
    videoHash: string,
  ) {
    const existingLesson = await this.getById(lessonHash);
    existingLesson.content.videos.remove(videoHash);
    existingLesson.save();
  }

  async addKeynote(
    lessonHash: string,
    addKeynoteDto: AddKeynoteDto,
  ) {
    const existingLesson = await this.getById(lessonHash);

    const existingKeynote = existingLesson.content.videos
      .find(video => String(video.videoHash) === addKeynoteDto.keynoteHash);

    if (existingKeynote) {
      throw new ConflictException(`addKeynote: Keynote ${addKeynoteDto.keynoteHash} already exist`);
    }

    existingLesson.content.keynotes.push(addKeynoteDto.keynoteHash);
    existingLesson.save();
  }

  async getKeynote(
    lessonHash: string,
    keynoteHash: string,
  ) {
    let existingLesson;

    try {
      existingLesson = await this.lessonModel
        .findOne({ _id: lessonHash })
        .populate('content.keynotes')
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingLesson) {
      throw new NotFoundException(`getKeynote: Keynote "${lessonHash}" not found`);
    }

    const existingKeynote = existingLesson.content.keynotes
      .find(keynote => String(keynote._id) === keynoteHash);

    if (!existingKeynote) {
      throw new NotFoundException(`getKeynote: Keynote "${keynoteHash}" not found`);
    }

    return existingKeynote;
  }

  async removeKeynote(
    lessonHash: string,
    keynoteHash: string,
  ) {
    const existingLesson = await this.getById(lessonHash);
    existingLesson.content.keynotes.remove(keynoteHash);
    existingLesson.save();
  }
}
