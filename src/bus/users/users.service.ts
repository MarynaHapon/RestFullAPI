// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// App
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  getAll() {
    return this.userModel
      .find()
      .exec();
  }

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async getById(userHash: string) {
    const user = await this.userModel
      .findOne({ _id: userHash })
      .exec();

    if (!user) {
      throw new NotFoundException(`User "${userHash}" not found`);
    }

    return user;
  }

  async update(userHash: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: userHash }, { $set: updateUserDto }, { new: true })
      .exec()

    if (!existingUser) {
      throw new NotFoundException(`User "${userHash}" not found`);
    }

    return existingUser;
  }

  async remove(userHash: string) {
    const existingUser = await this.getById(userHash);
    return existingUser.remove();
  }
}
