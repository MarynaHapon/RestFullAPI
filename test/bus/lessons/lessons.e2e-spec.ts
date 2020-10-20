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
  lessonToCreate,
  lessonToUpdate,
  lessonWithInvalidFields,
  lessonToExpect,
} from './lessons.mock';

describe('[Domain] Lessons - /lessons', () => {
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

  describe('Create [Post /lessons]', () => {
    it('Create', () => {
      return request(httpServer)
        .post('/lessons')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(lessonToCreate)
        .expect(HttpStatus.CREATED)
        .then(({ body: { data } }) => {
          hash = data._id;

          expect(data.title).toEqual(lessonToExpect.title);
          expect(data.description).toEqual(lessonToExpect.description);
          expect(data.order).toEqual(lessonToExpect.order);
          expect(data.availability).toEqual(lessonToExpect.availability);
        });
    });
    it('Create with invalid data', () => {
      return request(httpServer)
        .post('/lessons')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(lessonWithInvalidFields)
        .expect(HttpStatus.BAD_REQUEST)
    });
    it('Create without access', () => {
      return request(httpServer)
        .post('/lessons')
        .expect(HttpStatus.FORBIDDEN)
    });
  });

  describe('Get by ID [Get /lessons/:hash]', () => {
    it('Get by ID', () => {
      return request(httpServer)
        .get(`/lessons/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.title).toEqual(lessonToCreate.title);
          expect(data.description).toEqual(lessonToCreate.description);
          expect(data.order).toEqual(lessonToCreate.order);
          expect(data.availability).toEqual(lessonToCreate.availability);
        });
    });
    it('Get by non-existent ID', () => {
      return request(httpServer)
        .get(`/lessons/1`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.NOT_FOUND)
    });
    it('Get by ID without access', () => {
      return request(httpServer)
        .get(`/lessons/${hash}`)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('Update by ID [Put /lessons/:hash]', () => {
    it('Update one', () => {
      return request(httpServer)
        .put(`/lessons/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(lessonToUpdate)
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.title).toEqual(lessonToUpdate.title);
        });
    });
    it('Update one without access', () => {
      return request(httpServer)
        .put(`/lessons/${hash}`)
        .send(lessonToUpdate)
        .expect(HttpStatus.FORBIDDEN)
    });
    it('Update a non-existent class', () => {
      return request(httpServer)
        .put(`/lessons/1`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(lessonToUpdate)
        .expect(HttpStatus.NOT_FOUND)
    });
  });

  describe('Get all [Get /lessons]', () => {
    it('Get all', () => {
      return request(httpServer)
        .get('/lessons')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.length).toBeGreaterThan(0);
          expect(data[0].description).toEqual(lessonToExpect.description);
        });
    });
    it('Get all without access', () => {
      return request(httpServer)
        .get('/lessons')
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.length).toBeGreaterThan(0);
          expect(data[0].description).toEqual(lessonToExpect.description);
        });
    });
  });

  describe('Delete one [Delete /lessons/:hash]',() => {
    it('Delete one',  () => {
      return request(httpServer)
        .delete(`/lessons/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(() => {
          return request(app.getHttpServer())
            .get(`/lessons/${hash}`)
            .set('Authorization', app.get(ConfigService).get('api.key'))
            .expect(HttpStatus.NOT_FOUND);
        })
    });
    it('Delete a non-existent class',  () => {
      return request(httpServer)
        .delete('/lessons/1000')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.NOT_FOUND);

    });
    it('Delete without access', () => {
      return request(httpServer)
        .delete('/lessons/1')
        .expect(HttpStatus.FORBIDDEN);
    })
  });

  afterAll(async () => {
    await app.close();
  });
});
