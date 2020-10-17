// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson, LessonSchema } from './entity/lesson.entity';
import { Video, VideoSchema } from '../../common/entities/video.entity';
import { Keynote, KeynoteSchema } from '../../common/entities/keynote.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Lesson.name,
      schema: LessonSchema,
    }, {
      name: Video.name,
      schema: VideoSchema,
    }, {
      name: Keynote.name,
      schema: KeynoteSchema,
    }])
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
