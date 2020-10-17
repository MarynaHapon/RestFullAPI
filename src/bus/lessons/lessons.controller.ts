// Core
import {
  Body,
  Controller,
  Param,
  Query,
  Delete,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

// App
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AddVideoDto } from './dto/add-video.dto';
import { AddKeynoteDto } from './dto/add-keynote.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
  ) {}

  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto
  ) {
    return this.lessonsService.getAll(paginationQuery);
  }

  @Post()
  create(
    @Body(ValidationPipe) createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get(':lessonHash')
  getById(
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.lessonsService.getById(lessonHash);
  }

  @Put(':lessonHash')
  update(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(lessonHash, updateLessonDto);
  }

  @Delete(':lessonHash')
  remove(
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.lessonsService.remove(lessonHash);
  }

  @Post(':lessonHash/videos')
  addVideo(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) addVideoDto: AddVideoDto,
  ) {
    return this.lessonsService.addVideo(lessonHash, addVideoDto);
  }

  @Get(':lessonHash/videos/:videoHash')
  playVideo(
    @Param() param,
  ) {
    return this.lessonsService.playVideo(param);
  }

  @Delete(':lessonHash/videos/:videoHash')
  removeVideo(
    @Param() param,
  ) {
    return this.lessonsService.removeVideo(param);
  }

  @Post(':lessonHash/keynotes')
  addKeynote(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) addKeynoteDto: AddKeynoteDto,
  ) {
    return this.lessonsService.addKeynote(lessonHash, addKeynoteDto);
  }

  @Get(':lessonHash/keynotes/:keynoteHash')
  getKeynote(
    @Param() param,
  ) {
    return this.lessonsService.getKeynote(param);
  }

  @Get(':lessonHash/keynotes/:keynoteHash')
  removeKeynote(
    @Param() param,
  ) {
    return this.lessonsService.removeKeynote(param);
  }
}
