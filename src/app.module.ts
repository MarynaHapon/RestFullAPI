// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

// App
import config from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './bus/classes/classes.module';
import { LessonsModule } from './bus/lessons/lessons.module';
import { UsersModule } from './bus/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.required().default(config().database.port),
        DATABASE_NAME: Joi.required(),
      }),
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: config().database.uri,
      }),
    }),
    ClassesModule,
    LessonsModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    ConfigService,
  ],
})
export class AppModule {}
