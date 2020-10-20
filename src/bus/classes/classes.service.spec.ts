// Core
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// App
import { ClassesService } from './classes.service';
import { Class } from './entity/class.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';

type MockRepository<T = any> = Partial<Record<keyof mongoose.Model<Class>, jest.Mock>> | any;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  exec: jest.fn(),
  find: jest.fn(),
  skip: jest.fn(),
  limit: jest.fn(),
  save: jest.fn(),
});

describe('ClassesService', () => {
  let service: ClassesService;
  let classRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassesService,
        { provide: getModelToken(Class.name), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<ClassesService>(ClassesService);
    classRepository = module.get<MockRepository>(getModelToken(Class.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    describe('when classes existing', () => {
      it('should return the array with classes', async () => {
        const expectedClasses = [{}, {}, {}];
        const paginationQuery = { page: 1, limit: 24 }

        classRepository.find.mockReturnValue({ skip: () => ({ limit: () => ({ exec: () => (expectedClasses) }) }) });
        const classes = await service.getAll(paginationQuery);
        expect(classes).toEqual(expectedClasses);
      });
    });
  });

  describe('getById', () => {
    describe('when class with ID existing', () => {
      it('should return the class object', async () => {
        const id = '1';
        const expectedClass = {};

        classRepository.findOne.mockReturnValue({ exec: () => expectedClass });
        const classItem = await service.getById(id);

        expect(classItem).toEqual(expectedClass);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const id = '1';
        classRepository.findOne.mockReturnValue({ exec: () => undefined });

        try {
          await service.getById(id);
          done();
        } catch (error) {
          const text = error.response.error;
          expect(error).toBeInstanceOf(NotFoundException);
          expect(text).toEqual(`Class ":${id}" not found`);
          done();
        }
      })
    });
  });

  describe('create', () => {
    describe('when input data is valid', () => {
      it('should create new class', async () => {
        const inputData: CreateClassDto = {
          "title": "Class 1",
          "description": "class description",
          "order": 1,
          "duration": {
            "started": new Date(98),
            "closed": new Date(99),
          }
        };
        const expectedClass = {
          "_id": "5f8dc2462f344b3f389ba41e",
          "title": "Class 1",
          "description": "class description",
          "order": 1,
          "duration": {
            "started": "2020-10-17T18:37:44.166Z",
            "closed": "2020-10-17T18:37:44.166Z"
          },
          "__v": 0
        };

        it.todo('should create new class');
      });
    });

    describe('when input data is invalid', () => {
      it.todo('should return validation error');
    });
  });
});
