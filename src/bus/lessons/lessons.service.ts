// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// App
import { Lesson } from './entity/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
  ) {}

  getAll() {
    return this.lessonModel
      .find()
      .exec();
  }

  create(createLessonDto: CreateLessonDto) {
    const lesson = new this.lessonModel(createLessonDto);
    return lesson.save();
  }

  async getById(lessonHash: string) {
    const lesson = await this.lessonModel
      .findOne({ _id: lessonHash })
      .exec();

    if (!lesson) {
      throw new NotFoundException(`Lesson "${lessonHash}" not found`);
    }

    return lesson;
  }

  async update(lessonHash: string, updateLessonDto: UpdateLessonDto) {
    const existingLesson = await this.lessonModel
      .findOneAndUpdate({ _id: lessonHash }, { $set: updateLessonDto }, { new: true })
      .exec();

    if (!existingLesson) {
      throw new NotFoundException(`Lesson "${lessonHash}" not found`)
    }

    return existingLesson;
  }

  async remove(lessonHash: string) {
    const existingLesson = await this.getById(lessonHash);
    return existingLesson.remove();
  }

  addVideo(lessonHash: string, addVideoDto: any) {
    return lessonHash;
  }

  playVideo(param) {
    return param;
  }

  removeVideo(param) {
    return param;
  }

  addKeynote(lessonHash: string, addKeynoteDto: any) {
    return addKeynoteDto;
  }

  getKeynote(param) {
    let keynote;

    if (!keynote) {
      throw new NotFoundException(`Keynote "${param}" not found`);
    }

    return param;
  }

  removeKeynote(param) {
    return param;
  }
}
