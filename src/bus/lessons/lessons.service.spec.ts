// Core
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

// App
import { LessonsService } from './lessons.service';
import { Lesson } from './entity/lesson.entity';
import { Video } from '../../common/entities/video.entity';
import { Keynote } from '../../common/entities/keynote.entity';

describe('LessonsService', () => {
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        { provide: Connection, useValue: {} },
        { provide: getModelToken(Lesson.name), useValue: {} },
        { provide: getModelToken(Video.name), useValue: {} },
        { provide: getModelToken(Keynote.name), useValue: {} },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    describe('when class with ID existing', () => {
      it('should return the class object', async () => {


      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {

      })
    })
  });
});
