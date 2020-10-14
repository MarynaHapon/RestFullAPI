// Core
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

// App
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userHash')
  getById(
    @Param('userHash') userHash: string,
  ) {
    return this.usersService.getById(userHash);
  }

  @Put(':userHash')
  update(
    @Param('userHash') userHash: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userHash, updateUserDto);
  }

  @Delete(':userHash')
  remove(
    @Param('userHash') userHash: string,
  ) {
    return this.usersService.remove(userHash);
  }
}
