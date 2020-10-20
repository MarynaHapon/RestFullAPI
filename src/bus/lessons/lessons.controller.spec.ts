// Core
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

// App
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson } from './entity/lesson.entity';
import { Video } from '../../common/entities/video.entity';
import { Keynote } from '../../common/entities/keynote.entity';

describe('Lessons Controller', () => {
  let controller: LessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        LessonsService,
        { provide: getModelToken(MongooseModule.name), useValue: {} },
        { provide: getModelToken(Lesson.name), useValue: {} },
        { provide: getModelToken(Video.name), useValue: {} },
        { provide: getModelToken(Keynote.name), useValue: {} },
      ]
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
