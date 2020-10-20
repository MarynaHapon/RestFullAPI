// Core
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

// App
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
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
