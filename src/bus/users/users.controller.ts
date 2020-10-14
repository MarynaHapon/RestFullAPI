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

// Other
import { UsersService } from './users.service';

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
  create(@Body() body) {
    return this.usersService.create(body);
  }

  @Get(':userHash')
  getById(@Param('userHash') userHash: string) {
    return this.usersService.getById(userHash);
  }

  @Put(':userHash')
  update(@Param('userHash') userHash: string, @Body() body) {
    return this.usersService.update(userHash, body);
  }

  @Delete(':userHash')
  remove(@Param('userHash') userHash: string) {
    return this.usersService.remove(userHash);
  }
}
