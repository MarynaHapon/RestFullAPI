// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './bus/classes/classes.module';
import { LessonsModule } from './bus/lessons/lessons.module';
import { UsersModule } from './bus/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-project'),
    ClassesModule,
    LessonsModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
