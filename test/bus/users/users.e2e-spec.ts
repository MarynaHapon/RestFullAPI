// Core
import { HttpServer, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';

// App
import validationConfig from '../../../src/config/validation.config';
import { createModuleFixture } from '../../common/module.fixture';
import { HttpExceptionFilter } from '../../../src/common/filters/http-exception.filter';
import { WrapResponseInterceptor } from '../../../src/common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from '../../../src/common/interceptors/timeout.interceptor';
import {
  userToCreate,
  userToUpdate,
  userWithInvalidFields,
  userToExpect,
} from './users.mock';
import { lessonToExpect } from '../lessons/lessons.mock';

describe('[Domain] Users - /classes', () => {
  let app: INestApplication;
  let httpServer: HttpServer;
  let hash: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await createModuleFixture();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(validationConfig));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(
      new WrapResponseInterceptor(),
      new TimeoutInterceptor(),
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  describe('Create [Post /users]', () => {
    it('Create', () => {
      return request(httpServer)
        .post('/users')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(userToCreate)
        .expect(HttpStatus.CREATED)
        .then(({ body: { data } }) => {
          hash = data._id;

          expect(data.name).toEqual(userToExpect.name);
          expect(data.email).toEqual(userToExpect.email);
          expect(data.phone).toEqual(userToExpect.phone);
          expect(data.password).toEqual(userToExpect.password);
          expect(data.sex).toEqual(userToExpect.sex);
          expect(data.role).toEqual(userToExpect.role);
        });
    });
    it('Create with invalid data', () => {
      return request(httpServer)
        .post('/users')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(userWithInvalidFields)
        .expect(HttpStatus.BAD_REQUEST)
    });
    it('Create without access', () => {
      return request(httpServer)
        .post('/users')
        .send(userToCreate)
        .expect(HttpStatus.CREATED)
    });
  });

  describe('Get by ID [Get /users/:hash]', () => {
    it('Get by ID', () => {
      return request(httpServer)
        .get(`/users/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.name).toEqual(userToExpect.name);
          expect(data.email).toEqual(userToExpect.email);
          expect(data.phone).toEqual(userToExpect.phone);
          expect(data.password).toEqual(userToExpect.password);
          expect(data.sex).toEqual(userToExpect.sex);
          expect(data.role).toEqual(userToExpect.role);
        });
    });
    it('Get by non-existent ID', () => {
      return request(httpServer)
        .get(`/users/1`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.NOT_FOUND)
    });
    it('Get by ID without access', () => {
      return request(httpServer)
        .get(`/users/${hash}`)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('Update by ID [Put /users/:hash]', () => {
    it('Update one', () => {
      return request(httpServer)
        .put(`/users/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(userToUpdate)
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.name).toEqual(userToUpdate.name);
        });
    });
    it('Update one without access', () => {
      return request(httpServer)
        .put(`/users/${hash}`)
        .send(userToUpdate)
        .expect(HttpStatus.FORBIDDEN);
    });
    it('Update a non-existent class', () => {
      return request(httpServer)
        .put(`/users/1`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(userToUpdate)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('Get all [Get /users]', () => {
    it('Get all', () => {
      return request(httpServer)
        .get('/users')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          console.log(data[0].name);
          expect(data.length).toBeGreaterThan(0);
          expect(data[0].name).toEqual(userToExpect.name);
        });
    });
    it('Get all without access', () => {
      return request(httpServer)
        .get('/users')
        .expect(HttpStatus.FORBIDDEN)

    });
  });

  describe('Delete one [Delete /users/:hash]',() => {
    it('Delete one',  () => {
      return request(httpServer)
        .delete(`/users/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(() => {
          return request(app.getHttpServer())
            .get(`/users/${hash}`)
            .set('Authorization', app.get(ConfigService).get('api.key'))
            .expect(HttpStatus.NOT_FOUND);
        })
    });
    it('Delete a non-existent class',  () => {
      return request(httpServer)
        .delete('/users/1000')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.NOT_FOUND);

    });
    it('Delete without access', () => {
      return request(httpServer)
        .delete('/users/1')
        .expect(HttpStatus.FORBIDDEN);
    })
  });

  afterAll(async () => {
    await app.close();
  });
});
