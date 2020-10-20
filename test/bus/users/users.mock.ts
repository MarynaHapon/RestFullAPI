// App
import { CreateUserDto } from '../../../src/bus/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/bus/users/dto/update-user.dto';
import { Role, Sex } from '../../../src/common/types';

export const userToCreate: CreateUserDto = {
  name: 'John Doe',
  email: 'jdoe@example.com',
  phone: '+380 73 111-11-11',
  password: 'ab12345Cd',
  sex: Sex.m,
  role: Role.student,
};

export const userToUpdate: UpdateUserDto = {
  name: 'John Doe Upd',
  email: 'jdoe@example.com',
  phone: '+380 73 111-11-11',
  password: 'ab12345Cd',
  sex: Sex.m,
  role: Role.student,
}

export const userWithInvalidFields = {
  name: 'John Doe Upd',
  email: 'jdoe@example.com',
};

export const userToExpect = {
  name: 'John Doe',
  email: 'jdoe@example.com',
  phone: '+380 73 111-11-11',
  password: 'ab12345Cd',
  sex: 'm',
  role: 'student',
};
