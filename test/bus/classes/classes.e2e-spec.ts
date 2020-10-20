// Core
import { HttpStatus, INestApplication, ValidationPipe, HttpServer } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';

// App
import validationConfig from '../../../src/config/validation.config';
import { WrapResponseInterceptor } from '../../../src/common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from '../../../src/common/interceptors/timeout.interceptor';
import { HttpExceptionFilter } from '../../../src/common/filters/http-exception.filter';
import {
  classToCreate,
  classToUpdate,
  classWithInvalidFields,
  classToExpect,
} from './classes.mock';
import {
  createModuleFixture,
} from '../../common/module.fixture';

describe('[Domain] Classes - /classes', () => {
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

  describe('Create [Post /classes]', () => {
    it('Create', () => {
      return request(httpServer)
        .post('/classes')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(classToCreate)
        .expect(HttpStatus.CREATED)
        .then(({ body: { data } }) => {
          hash = data._id;

          expect(data.title).toEqual(classToExpect.title);
          expect(data.description).toEqual(classToExpect.description);
          expect(data.order).toEqual(classToExpect.order);
          expect(data.duration.started).toEqual(classToExpect.duration.started);
          expect(data.duration.closed).toEqual(classToExpect.duration.closed);
        });
    });
    it('Create with invalid data', () => {
      return request(httpServer)
        .post('/classes')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(classWithInvalidFields)
        .expect(HttpStatus.BAD_REQUEST)
    });
    it('Create without access', () => {
      return request(httpServer)
        .post('/classes')
        .expect(HttpStatus.FORBIDDEN)
    });
  });

  describe('Get by ID [Get /classes/:hash]', () => {
    it('Get by ID', () => {
      return request(httpServer)
        .get(`/classes/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.title).toEqual(classToExpect.title);
          expect(data.description).toEqual(classToExpect.description);
          expect(data.order).toEqual(classToExpect.order);
          expect(data.duration.started).toEqual(classToExpect.duration.started);
          expect(data.duration.closed).toEqual(classToExpect.duration.closed);
        });
    });
    it('Get by non-existent ID', () => {
      return request(httpServer)
        .get(`/classes/1`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.NOT_FOUND)
    });
    it('Get by ID without access', () => {
      return request(httpServer)
        .get(`/classes/${hash}`)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('Update by ID [Put /classes/:hash]', () => {
    it('Update one', () => {
      return request(httpServer)
        .put(`/classes/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(classToUpdate)
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.title).toEqual(classToUpdate.title);
        });
    });
    it('Update one without access', () => {
      return request(httpServer)
        .put(`/classes/${hash}`)
        .send(classToUpdate)
        .expect(HttpStatus.FORBIDDEN)
    });
    it('Update a non-existent class', () => {
      return request(httpServer)
        .put(`/classes/1`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .send(classToUpdate)
        .expect(HttpStatus.NOT_FOUND)
    });
  });

  describe('Get all [Get /classes]', () => {
    it('Get all', () => {
      return request(httpServer)
        .get('/classes')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.length).toBeGreaterThan(0);
          expect(data[0].description).toEqual(classToExpect.description);
        });
    });
    it('Get all without access', () => {
      return request(httpServer)
        .get('/classes')
        .expect(HttpStatus.OK)
        .then(({ body: { data } }) => {
          expect(data.length).toBeGreaterThan(0);
          expect(data[0].description).toEqual(classToExpect.description);
        });
    });
  });

  describe('Delete one [Delete /classes/:hash]',() => {
    it('Delete one',  () => {
      return request(httpServer)
        .delete(`/classes/${hash}`)
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.OK)
        .then(() => {
          return request(app.getHttpServer())
            .get(`/classes/${hash}`)
            .set('Authorization', app.get(ConfigService).get('api.key'))
            .expect(HttpStatus.NOT_FOUND);
        })
    });
    it('Delete a non-existent class',  () => {
      return request(httpServer)
        .delete('/classes/1000')
        .set('Authorization', app.get(ConfigService).get('api.key'))
        .expect(HttpStatus.NOT_FOUND);

    });
    it('Delete without access', () => {
      return request(httpServer)
        .delete('/classes/1')
        .expect(HttpStatus.FORBIDDEN);
    })
  });

  afterAll(async () => {
    await app.close();
  });
});
