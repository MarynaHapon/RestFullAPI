// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// App
import { Class } from './entity/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>
  ) {}

  getAll(
    paginationQuery: PaginationQueryDto,
  ) {
    const { limit, page } = paginationQuery;
    return this.classModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  create(
    createClassDto: CreateClassDto,
  ) {
    const createdClass = new this.classModel(createClassDto)
    return createdClass.save();
  }

  async getById(
    classHash: string,
  ) {
    let existingClass;

    try {
      existingClass = await this.classModel
       .findOne({ _id: classHash })
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
      existingClass = await this.classModel
        .findByIdAndUpdate({ _id: classHash }, { $set: updateClassDto }, { new: true })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingClass) {
      throw new NotFoundException(`Class ":${classHash}" not found`)
    }

    return existingClass;
  }

  async remove(
    classHash: string,
  ) {
    const existingClass = await this.getById(classHash);
    return existingClass.remove();
  }

  enrollStudent(
    classHash: string,
  ) {
    return classHash;
  }

  expelStudent(
    classHash: string,
  ) {
    return classHash;
  }
}
