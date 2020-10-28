// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson, LessonSchema } from './entity/lesson.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Lesson.name,
      schema: LessonSchema,
    }]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
