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
  ValidationPipe, HttpCode, HttpStatus,
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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @ApiTags('Users')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить пользователей',
    description: 'Эндпоинт используется получения всех пользователей',
  })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.usersService.getAll(paginationQuery);
  }

  @ApiTags('Users')
  @ApiOperation({
    summary: 'Создать пользователя',
    description: 'Эндпоинт используется для создания пользователя. Необязательное условие состоит в том чтобы добавить проверку на уникальность email.',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Public()
  @Post()
  create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('Users')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Получить пользователя по hash',
    description: 'Эндпоинт используется получения пользователя по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Get(':userHash')
  getById(
    @Param('userHash') userHash: string,
  ) {
    return this.usersService.getById(userHash);
  }

  @ApiTags('Users')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Обновить пользователя',
    description: 'Эндпоинт используется для обновления пользователя по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @Put(':userHash')
  update(
    @Param('userHash') userHash: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userHash, updateUserDto);
  }

  @ApiTags('Users')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Удалить пользователя',
    description: 'Эндпоинт используется для удаления пользователя по его hash',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userHash')
  remove(
    @Param('userHash') userHash: string,
  ) {
    return this.usersService.remove(userHash);
  }
}
