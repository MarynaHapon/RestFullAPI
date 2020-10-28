// Core
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBasicAuth,
  ApiOperation,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

// App
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiTags('Auth')
  @ApiOperation({
    summary: 'Залогинить пользователя',
    description: 'Эндпоинт используется для логина пользователя. После успешного логина необходимо в куки клиента записать идентификатор токена, который будет автоматически подкладываться во все последующие запросы.',
  })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Post('login')
  login(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.authService.login(request, response);
  }

  @ApiTags('Auth')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Разлогинить пользователя',
    description: 'Эндпоинт используется для разлогина пользователя. В случае успешной операции необходимо удалить идентификатор токена из кук клиента, а также очистить токен из хранилища.',
  })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  @ApiNotFoundResponse({ description: 'Ресурс не найден' })
  @ApiRequestTimeoutResponse({ description: 'Долгий ответ сервера' })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(
    @Res() response: Response,
  ) {
    return this.authService.logout(response);
  }
}
