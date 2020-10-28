// Core
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

// APP
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { getCookiesMap } from '../helpers/get-cookie-map.helper';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const apiKey = this.configService.get('api.key');
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request>();

    const cookies = getCookiesMap(request.headers.cookie);
    const authKey = cookies['auth'];

    return authKey === apiKey;
  }
}
