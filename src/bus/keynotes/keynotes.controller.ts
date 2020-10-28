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
import { KeynotesService } from './keynotes.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateKeynoteDto } from './dto/create-keynote.dto';
import { UpdateKeynoteDto } from './dto/update-keynote.dto';
import { WrapResponseInterceptor } from '../../common/interceptors/wrap-response.interceptor';

@Controller('keynotes')
export class KeynotesController {
  constructor(
    private readonly keynotesService: KeynotesService,
  ) {}

  @ApiTags('Keynotes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить все презентации',
    description: 'Эндпоинт используется для получения всех презентаций',
  })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.keynotesService.getAll(paginationQuery);
  }

  @ApiTags('Keynotes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Создать презентацию',
    description: 'Эндпоинт используется для создания презентаций.',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Post()
  create(
    @Body() createKeynoteDto: CreateKeynoteDto,
  ) {
    return this.keynotesService.create(createKeynoteDto);
  }

  @ApiTags('Keynotes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить презентацию по hash',
    description: 'Эндпоинт используется для получения конкретной презентации по hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Get(':keynoteHash')
  getById(
    @Param('keynoteHash') keynoteHash: string,
  ) {
    return this.keynotesService.getById(keynoteHash);
  }


  @ApiTags('Keynotes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Обновить презентацию',
    description: 'Эндпоинт используется для обновления презентации по hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @UseInterceptors(new WrapResponseInterceptor())
  @Put(':keynoteHash')
  update(
    @Param('keynoteHash') keynoteHash: string,
    @Body(ValidationPipe) updateKeynoteDto: UpdateKeynoteDto,
  ) {
    return this.keynotesService.update(keynoteHash, updateKeynoteDto);
  }

  @ApiTags('Keynotes')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить презентацию',
    description: 'Эндпоинт используется для удаления презентации по hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':keynoteHash')
  remove(
    @Param('keynoteHash') keynoteHash: string,
  ) {
    this.keynotesService.remove(keynoteHash);
  }
}
