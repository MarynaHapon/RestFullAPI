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
} from '@nestjs/common';

// App
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
  ) {}

  @Get()
  getAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.classesService.getAll();
  }

  @Post()
  create(@Body() body) {
    return this.classesService.create(body);
  }

  @Get(':classHash')
  getById(@Param('classHash') classHash: string) {
    return this.classesService.getById(classHash);
  }

  @Put(':classHash')
  update(@Param('classHash') classHash: string, @Body() body) {
    return this.classesService.update(classHash, body);
  }

  @Delete(':classHash')
  remove(@Param('classHash') classHash: string) {
    return this.classesService.remove(classHash);
  }

  @Post(':classHash/enroll')
  enrollStudent(@Param('classHash') classHash: string) {
    return this.classesService.enrollStudent(classHash);
  }

  @Post(':classHash/expel')
  expelStudent(@Param('classHash') classHash: string) {
    return this.classesService.expelStudent(classHash);
  }
}
