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
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse, ApiTags,
} from '@nestjs/swagger';

// App
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AddVideoDto } from './dto/add-video.dto';
import { AddKeynoteDto } from './dto/add-keynote.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Public } from '../../common/decorators/public.decorator';
import { SplitCreateLessonBodyPipe } from './pipes/split-create-lesson-body.pipe';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
  ) {}

  @ApiTags('Lessons')
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Public()
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto
  ) {
    return this.lessonsService.getAll(paginationQuery);
  }

  @ApiTags('Lessons')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Post()
  create(
    @Body(SplitCreateLessonBodyPipe) createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiTags('Lessons by hash')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Get(':lessonHash')
  getById(
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.lessonsService.getById(lessonHash);
  }

  @ApiTags('Lessons by hash')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Put(':lessonHash')
  update(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(lessonHash, updateLessonDto);
  }

  @ApiTags('Lessons by hash')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Delete(':lessonHash')
  remove(
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.lessonsService.remove(lessonHash);
  }

  @ApiTags('Education')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Post(':lessonHash/videos')
  addVideo(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) addVideoDto: AddVideoDto,
  ) {
    return this.lessonsService.addVideo(lessonHash, addVideoDto);
  }

  @ApiTags('Education')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Get(':lessonHash/videos/:videoHash')
  playVideo(
    @Param() param,
  ) {
    return this.lessonsService.playVideo(param);
  }

  @ApiTags('Education')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Delete(':lessonHash/videos/:videoHash')
  removeVideo(
    @Param() param,
  ) {
    return this.lessonsService.removeVideo(param);
  }

  @ApiTags('Education')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Post(':lessonHash/keynotes')
  addKeynote(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) addKeynoteDto: AddKeynoteDto,
  ) {
    return this.lessonsService.addKeynote(lessonHash, addKeynoteDto);
  }

  @ApiTags('Education')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Get(':lessonHash/keynotes/:keynoteHash')
  getKeynote(
    @Param() param,
  ) {
    return this.lessonsService.getKeynote(param);
  }

  @ApiTags('Education')
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Get(':lessonHash/keynotes/:keynoteHash')
  removeKeynote(
    @Param() param,
  ) {
    return this.lessonsService.removeKeynote(param);
  }
}
