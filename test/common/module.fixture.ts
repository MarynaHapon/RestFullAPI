// Core
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from '../../src/config/app.config';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { ClassesModule } from '../../src/bus/classes/classes.module';
import { LessonsModule } from '../../src/bus/lessons/lessons.module';
import { UsersModule } from '../../src/bus/users/users.module';
import { CommonModule } from '../../src/common/common.module';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

export const createModuleFixture = async () => {
  return await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        validationSchema: Joi.object({
          DATABASE_HOST: Joi.required(),
          DATABASE_PORT: Joi.required().default(this),
          DATABASE_NAME: Joi.required(),
        }),
        load: [appConfig],
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          uri: config.get('database.testUri'),
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
  }).compile();
}
