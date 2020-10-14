// Core
import { Module } from '@nestjs/common';

// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesController } from './bus/classes/classes.controller';
import { LessonsController } from './bus/lessons/lessons.controller';
import { UsersController } from './bus/users/users.controller';
import { ClassesService } from './bus/classes/classes.service';
import { LessonsService } from './bus/lessons/lessons.service';
import { UsersService } from './bus/users/users.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ClassesController,
    LessonsController,
    UsersController,
  ],
  providers: [
    AppService,
    ClassesService,
    LessonsService,
    UsersService,
  ],
})
export class AppModule {}
