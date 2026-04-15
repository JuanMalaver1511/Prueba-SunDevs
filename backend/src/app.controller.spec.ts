import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getRoot', () => {
    it('should expose the api entrypoint', () => {
      expect(appController.getRoot()).toEqual({
        message: 'Backend activo',
        endpoint: '/api/videos',
      });
    });
  });

  describe('getApiRoot', () => {
    it('should expose the available api endpoints', () => {
      expect(appController.getApiRoot()).toEqual({
        message: 'API activa',
        endpoints: ['/api/videos'],
      });
    });
  });
});
