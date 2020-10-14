// Core
import { Injectable, NotFoundException } from '@nestjs/common';

// App
import { User } from './entity/user.entity';
import { Role, Sex } from '../../common/types';

@Injectable()
export class UsersService {
  public users: User[] = [
    {
      name: 'Maryna',
      email: 'test@gmail.com',
      phone: '90453445234',
      password: '123456',
      sex: Sex.f,
      role: Role.student,
    }
  ];

  getAll() {
    return this.users;
  }

  create(createUserDto: any) {
    return this.users;
  }

  getById(userHash: string) {
    let user;

    if (!user) {
      throw new NotFoundException(`User "${userHash}" not found`);
    }

    return this.users;
  }

  update(userHash: string, updateUserDto) {
    return this.users;
  }

  remove(userHash: string) {
    return this.users;
  }
}
