// Core
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

// App
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Class } from './entity/class.entity';

describe('Classes Controller', () => {
  let controller: ClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassesController],
      providers: [
        ClassesService,
        { provide: getModelToken(MongooseModule.name), useValue: {} },
        { provide: getModelToken(Class.name), useValue: {} },
      ],
    }).compile();

    controller = module.get<ClassesController>(ClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
