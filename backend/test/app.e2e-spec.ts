import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/videos (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/videos')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            thumbnail: expect.any(String),
            title: expect.any(String),
            author: expect.any(String),
            publishedRelative: expect.any(String),
            hypeLevel: expect.any(Number),
          }),
        );
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        message: 'Backend activo',
        endpoint: '/api/videos',
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
