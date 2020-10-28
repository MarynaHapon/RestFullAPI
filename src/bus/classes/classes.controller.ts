// Core
import {
  Controller,
  Query,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBasicAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

// App
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Public } from '../../common/decorators/public.decorator';
import { AddLessonDto } from './dto/add-lesson.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { ExpelStudentDto } from './dto/expel-student.dto';

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
  ) {}

  @ApiTags('Classes')
  @ApiOperation({
    summary: 'Получить потоки',
    description: 'Эндпоинт используется получения всех потоков',
  })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Public()
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.classesService.getAll(paginationQuery);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Создать поток',
    description: 'Эндпоинт используется для создания потока',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Post()
  create(
    @Body() createClassDto: CreateClassDto,
  ) {
    return this.classesService.create(createClassDto);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить поток по hash',
    description: 'Эндпоинт используется получения потока по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Get(':classHash')
  getById(
    @Param('classHash') classHash: string,
  ) {
    return this.classesService.getById(classHash);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Обновить поток',
    description: 'Эндпоинт используется для обновления потока по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Put(':classHash')
  update(
    @Param('classHash') classHash: string,
    @Body(ValidationPipe) updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(classHash, updateClassDto);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить поток',
    description: 'Эндпоинт используется для удаления потока по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':classHash')
  remove(
    @Param('classHash') classHash: string,
  ) {
    return this.classesService.remove(classHash);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Добавить урок к потоку',
    description: 'Эндпоинт используется для добавления урока к потоку.',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiConflictResponse({ description: 'Урок уже добавлен на поток' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.CREATED)
  @Post(':classHash/lessons')
  addLesson(
    @Param('classHash') classHash: string,
    @Body() addLessonDto: AddLessonDto,
  ) {
    return this.classesService.addLesson(classHash, addLessonDto);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить урок с потока',
    description: 'Эндпоинт используется для удаления урока с потока.',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':classHash/lessons/:lessonHash')
  removeLesson(
    @Param('classHash') classHash: string,
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.classesService.removeLesson(classHash, lessonHash);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Зачислить студента на поток',
    description: 'Эндпоинт используется для зачисления студента на поток',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiConflictResponse({ description: 'Студент уже зачислен на поток' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':classHash/enroll')
  enrollStudent(
    @Param('classHash') classHash: string,
    @Body() enrollStudentDto: EnrollStudentDto,
  ) {
    return this.classesService.enrollStudent(classHash, enrollStudentDto);
  }

  @ApiTags('Classes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Отчислить студента с потока',
    description: 'Эндпоинт используется для отчисления студента с потока',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':classHash/expel')
  expelStudent(
    @Param('classHash') classHash: string,
    @Body() expelStudentDto: ExpelStudentDto,
  ) {
    return this.classesService.expelStudent(classHash, expelStudentDto);
  }
}
