// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// App
import { Keynote } from './entity/keynote.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateKeynoteDto } from './dto/create-keynote.dto';
import { UpdateKeynoteDto } from './dto/update-keynote.dto';

@Injectable()
export class KeynotesService {
  constructor(
    @InjectModel(Keynote.name) private readonly keynoteModel: Model<Keynote>,
  ) {}

  getAll(
    paginationQuery: PaginationQueryDto,
  ) {
    const { limit, page } = paginationQuery;
    return this.keynoteModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  async create(
    createKeynoteDto: CreateKeynoteDto,
  ) {
    const createdKeynote = new this.keynoteModel(createKeynoteDto);
    createdKeynote.save();
    return { hash: createdKeynote._id };
  }

  async getById(
    keynoteHash: string,
  ) {
    let existingKeynote;

    try {
      existingKeynote = await this.keynoteModel
        .findOne({ _id: keynoteHash })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingKeynote) {
      throw new NotFoundException(`Keynote ":${keynoteHash}" not found`);
    }

    return existingKeynote;
  }

  async update(
    keynoteHash: string,
    updateKeynoteDto: UpdateKeynoteDto,
  ) {
    let existingKeynote;

    try {
      existingKeynote = await this.keynoteModel
        .findByIdAndUpdate({ _id: keynoteHash }, { $set: updateKeynoteDto }, { new: true })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingKeynote) {
      throw new NotFoundException(`Keynote ":${keynoteHash}" not found`)
    }

    return existingKeynote;
  }

  async remove(
    keynoteHash: string,
  ) {
    const existingKeynote = await this.getById(keynoteHash)
    existingKeynote.remove();
  }
}
