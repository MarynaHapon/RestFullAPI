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
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
  ) {}

  @Public()
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.classesService.getAll(paginationQuery);
  }

  @Post()
  create(
    @Body() createClassDto: CreateClassDto,
  ) {
    return this.classesService.create(createClassDto);
  }

  @Get(':classHash')
  getById(
    @Param('classHash') classHash: string,
  ) {
    return this.classesService.getById(classHash);
  }


  @Put(':classHash')
  update(
    @Param('classHash') classHash: string,
    @Body(ValidationPipe) updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(classHash, updateClassDto);
  }

  @Delete(':classHash')
  remove(
    @Param('classHash') classHash: string,
  ) {
    return this.classesService.remove(classHash);
  }

  @Post(':classHash/enroll')
  enrollStudent(
    @Param('classHash') classHash: string,
  ) {
    return this.classesService.enrollStudent(classHash);
  }

  @Post(':classHash/expel')
  expelStudent(
    @Param('classHash') classHash: string,
  ) {
    return this.classesService.expelStudent(classHash);
  }
}
