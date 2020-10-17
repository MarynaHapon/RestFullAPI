// Core
import {
  Controller,
  Query,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';

// App
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.usersService.getAll(paginationQuery);
  }

  @Post()
  create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
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
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
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
