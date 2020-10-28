// Core
import {
  Controller,
  Query,
  Param,
  Body,
  HttpCode,
  UseInterceptors,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBasicAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse, ApiOperation,
} from '@nestjs/swagger';

// App
import { VideosService } from './videos.service';
import { WrapResponseInterceptor } from '../../common/interceptors/wrap-response.interceptor';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
  ) {}

  @ApiTags('Videos')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить все видео',
    description: 'Эндпоинт используется для получения всех видео',
  })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.videosService.getAll(paginationQuery);
  }

  @ApiTags('Videos')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Создать видео',
    description: 'Эндпоинт используется для создания видео.',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Post()
  create(
    @Body() createVideoDto: CreateVideoDto,
  ) {
    return this.videosService.create(createVideoDto);
  }

  @ApiTags('Videos')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить видео по hash',
    description: 'Эндпоинт используется для получения конкретного видео по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Get(':videoHash')
  getById(
    @Param('videoHash') videoHash: string,
  ) {
    return this.videosService.getById(videoHash);
  }

  @ApiTags('Videos')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Обновить видео',
    description: 'Эндпоинт используется для обновления видео по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Put(':videoHash')
  update(
    @Param('videoHash') videoHash: string,
    @Body(ValidationPipe) updateVideoDto: UpdateVideoDto,
  ) {
    return this.videosService.update(videoHash, updateVideoDto);
  }

  @ApiTags('Videos')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить видео',
    description: 'Эндпоинт используется для удаления видео по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':videoHash')
  remove(
    @Param('videoHash') videoHash: string,
  ) {
    return this.videosService.remove(videoHash);
  }
}
