// Core
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const exceptionStatus = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error = typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, unknown>);

    const body = {
      ...error,
      timestamp: new Date().toISOString(),
    }

    response
      .status(exceptionStatus)
      .json(body);
  }
}
