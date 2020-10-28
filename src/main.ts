// Core
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// App
import validationConfig from './config/validation.config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('app.port');

  const corsOptions = {
    origin: `http://localhost:3000`,
    credentials: true,
  }

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Nest.js Fundamentals Final Project Docs')
    .setDescription('Nest.js Fundamentals Final Project Docs')
    .setContact('Maryna Hapon', 'https://git.alldigitalads.com/front.marina.h', 'front.marina.h@alldigitalads')
    .setVersion('1.0.0')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addCookieAuth('auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);


  await app.listen(port);
}
bootstrap();
