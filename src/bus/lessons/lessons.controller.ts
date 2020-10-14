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
  create(@Body() body) {
    return this.lessonsService.create(body);
  }

  @Get(':lessonHash')
  getById(@Param('lessonHash') lessonHash: string) {
    return this.lessonsService.getById(lessonHash);
  }

  @Put(':lessonHash')
  update(@Param('lessonHash') lessonHash: string, @Body() body) {
    return this.lessonsService.update(lessonHash, body);
  }

  @Delete(':lessonHash')
  remove(@Param('lessonHash') lessonHash: string) {
    return this.lessonsService.remove(lessonHash);
  }

  @Post(':lessonHash/videos')
  addVideo(@Param('lessonHash') lessonHash: string, @Body() body) {
    return this.lessonsService.addVideo(lessonHash, body);
  }

  @Get(':lessonHash/videos/:videoHash')
  playVideo(@Param() param) {
    return this.lessonsService.playVideo(param);
  }

  @Delete(':lessonHash/videos/:videoHash')
  removeVideo(@Param() param) {
    return this.lessonsService.removeVideo(param);
  }

  @Post(':lessonHash/keynotes')
  addKeynote(@Param('lessonHash') lessonHash: string, @Body() body) {
    return this.lessonsService.addKeynote(lessonHash, body);
  }

  @Get(':lessonHash/keynotes/:keynoteHash')
  getKeynote(@Param() param) {
    return this.lessonsService.getKeynote(param);
  }

  @Get(':lessonHash/keynotes/:keynoteHash')
  removeKeynote(@Param() param) {
    return this.lessonsService.removeKeynote(param);
  }
}
