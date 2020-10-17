// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

// App
import config from './config/app.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClassesModule } from './bus/classes/classes.module';
import { LessonsModule } from './bus/lessons/lessons.module';
import { UsersModule } from './bus/users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.required().default(this),
        DATABASE_NAME: Joi.required(),
      }),
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database.uri'),
      }),
    }),
    ClassesModule,
    LessonsModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
