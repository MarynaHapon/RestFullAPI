// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// App
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  getAll(
    paginationQuery: PaginationQueryDto,
  ) {
    const { limit, page } = paginationQuery;
    return this.userModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  create(
    createUserDto: CreateUserDto,
  ) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async getByEmail(
    email: string
  ) {
    let user;

    try {
      user = await this.userModel
        .findOne({ email: email })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!user) {
      throw new NotFoundException(`User "${email}" not found`);
    }

    return user;
  }

  async getById(
    userHash: string
  ) {
    let user;

    try {
      user = await this.userModel
        .findOne({ _id: userHash })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!user) {
      throw new NotFoundException(`User "${userHash}" not found`);
    }

    return user;
  }

  async update(
    userHash: string,
    updateUserDto: UpdateUserDto,
  ) {
    let existingUser;

    try {
      existingUser = await this.userModel
        .findOneAndUpdate({ _id: userHash }, { $set: updateUserDto }, { new: true })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingUser) {
      throw new NotFoundException(`User "${userHash}" not found`);
    }

    return existingUser;
  }

  async remove(
    userHash: string,
  ) {
    const existingUser = await this.getById(userHash);
    existingUser.remove();
  }
}
