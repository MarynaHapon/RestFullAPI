// Core
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// App
import { Class } from './entity/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { AddLessonDto } from './dto/add-lesson.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { ExpelStudentDto } from './dto/expel-student.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private readonly classesModel: Model<Class>
  ) {}

  getAll(
    paginationQuery: PaginationQueryDto,
  ) {
    const { limit, page } = paginationQuery;
    return this.classesModel
      .find()
      .skip(page)
      .limit(limit)
      .populate({ path: 'lessons', populate: { path: 'content.videos content.keynotes' } })
      .populate('students.user')
      .exec();
  }

  create(
    createClassDto: CreateClassDto,
  ) {
    const createdClass = new this.classesModel(createClassDto);
    createdClass.save();
    return { hash: createdClass._id };
  }

  async getById(
    classHash: string,
  ) {
    let existingClass;

    try {
      existingClass = await this.classesModel
        .findOne({ _id: classHash })
        .populate({ path: 'lessons', populate: { path: 'content.videos content.keynotes' } })
        .populate('students.user')
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingClass) {
      throw new NotFoundException(`Class ":${classHash}" not found`);
    }

    return existingClass;
  }

  async update(
    classHash: string,
    updateClassDto: UpdateClassDto,
  ) {
    let existingClass;

    try {
      existingClass = await this.classesModel
        .findByIdAndUpdate({ _id: classHash }, { $set: updateClassDto }, { new: true })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingClass) {
      throw new NotFoundException(`update: Class ":${classHash}" not found`)
    }

    return existingClass;
  }

  async remove(
    classHash: string,
  ) {
    const existingClass = await this.getById(classHash);
    existingClass.remove();
  }

  async enrollStudent(
    classHash: string,
    enrollStudentDto : EnrollStudentDto,
  ) {
    const existingClass = await this.getById(classHash);
    const existingStudent = existingClass.students
      .find(student => String(student.user) === enrollStudentDto.userHash);

    if (existingStudent) {
      throw new ConflictException(`enrollStudent: Student ${enrollStudentDto.userHash} already exist`);
    }

    existingClass.students.push(enrollStudentDto);
    existingClass.save();
  }

  async expelStudent(
    classHash: string,
    expelStudent: ExpelStudentDto,
  ) {
    let existingClass;

    try {
      existingClass = await this.classesModel
        .findOneAndUpdate(
          { _id: classHash },
          { $pull: { students: { user: expelStudent.userHash } } },
        )
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingClass) {
      throw new NotFoundException(`expelStudent: Class ":${classHash}" not found`);
    }
  }

  async addLesson(
    classHash: string,
    addLessonDto: AddLessonDto,
  ) {
    const existingClass = await this.getById(classHash);

    const existingLesson = existingClass.lessons
      .find(lesson => String(lesson._id) === addLessonDto.lessonHash);

    if (existingLesson) {
      throw new ConflictException(`addLesson: Lesson ${addLessonDto.lessonHash} already exist`);
    }

    existingClass.lessons.push(addLessonDto.lessonHash);
    existingClass.save();

    return { hash: existingClass._id }
  }

  async removeLesson(
    classHash: string,
    lessonHash: string,
  ) {
    const existingClass = await this.getById(classHash);
    existingClass.lessons.remove(lessonHash);
    existingClass.save();
  }
}
