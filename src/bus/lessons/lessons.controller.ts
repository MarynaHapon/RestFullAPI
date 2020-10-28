// Core
import {
  Body,
  Controller,
  Param,
  Query,
  HttpCode,
  UseInterceptors,
  Delete,
  Get,
  Post,
  Put,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
  ApiOperation,
  ApiBasicAuth,
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
import { WrapResponseInterceptor } from '../../common/interceptors/wrap-response.interceptor';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
  ) {}

  @ApiTags('Lessons')
  @ApiOperation({
    summary: 'Получить уроки',
    description: 'Эндпоинт используется получения всех уроков',
  })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Public()
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto
  ) {
    return this.lessonsService.getAll(paginationQuery);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Создать урок',
    description: 'Эндпоинт используется для создания урока',
  })
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

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить урок по hash',
    description: 'Эндпоинт используется получения урока по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Get(':lessonHash')
  getById(
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.lessonsService.getById(lessonHash);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Обновить урок',
    description: 'Эндпоинт используется для обновления урока по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Put(':lessonHash')
  update(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(lessonHash, updateLessonDto);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить урок',
    description: 'Эндпоинт используется для удаления урока по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':lessonHash')
  remove(
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.lessonsService.remove(lessonHash);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Добавить видео к уроку',
    description: 'Эндпоинт используется для добавления видео к уроку',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':lessonHash/videos')
  addVideo(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) addVideoDto: AddVideoDto,
  ) {
    return this.lessonsService.addVideo(lessonHash, addVideoDto);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Добавить презентацию к уроку',
    description: 'Эндпоинт используется для добавления презентации к уроку',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':lessonHash/keynotes')
  addKeynote(
    @Param('lessonHash') lessonHash: string,
    @Body(ValidationPipe) addKeynoteDto: AddKeynoteDto,
  ) {
    return this.lessonsService.addKeynote(lessonHash, addKeynoteDto);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить видео по уроку',
    description: 'Эндпоинт используется для получения видео по уроку',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Get(':lessonHash/videos/:videoHash')
  getVideo(
    @Param('lessonHash') lessonHash: string,
    @Param('videoHash') videoHash: string,
  ) {
    return this.lessonsService.getVideo(lessonHash, videoHash);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить видео из урока',
    description: 'Эндпоинт используется для удаления видео из урока',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':lessonHash/videos/:videoHash')
  removeVideo(
    @Param() param,
    @Param('lessonHash') lessonHash: string,
    @Param('videoHash') videoHash: string,
  ) {
    return this.lessonsService.removeVideo(lessonHash, videoHash);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить презентацию по уроку',
    description: 'Эндпоинт используется для получения презентации по уроку',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Get(':lessonHash/keynotes/:keynoteHash')
  getKeynote(
    @Param('lessonHash') lessonHash: string,
    @Param('keynoteHash') keynoteHash: string,
  ) {
    return this.lessonsService.getKeynote(lessonHash, keynoteHash);
  }

  @ApiTags('Lessons')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить презентацию из урока',
    description: 'Эндпоинт используется для удаления презентации из урока',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':lessonHash/keynotes/:keynoteHash')
  removeKeynote(
    @Param('lessonHash') lessonHash: string,
    @Param('keynoteHash') keynoteHash: string,
  ) {
    return this.lessonsService.removeKeynote(lessonHash, keynoteHash);
  }
}
