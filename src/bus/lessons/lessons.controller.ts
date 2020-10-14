// Core
import {
  Body,
  Controller,
  Param,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';

// App
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AddVideoDto } from './dto/add-video.dto';
import { AddKeynoteDto } from './dto/add-keynote.dto';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
  ) {}

  @Get()
  getAll() {
    return this.lessonsService.getAll();
  }

  @Post()
  create(
    @Body() createLessonDto: CreateLessonDto,
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
    @Body() updateLessonDto: UpdateLessonDto,
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
    @Body() addVideoDto: AddVideoDto,
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
    @Body() addKeynoteDto: AddKeynoteDto,
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
