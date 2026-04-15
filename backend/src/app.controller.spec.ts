import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getVideos', () => {
    it('should delegate to the service', () => {
      const serviceResult = [
        {
          id: 'vid_001',
          thumbnail: 'https://example.com/thumb.jpg',
          title: 'Video',
          author: 'Autor',
          publishedRelative: 'Hace 1 dia',
          hypeLevel: 0.5,
        },
      ];

      jest.spyOn(appService, 'getVideos').mockReturnValue(serviceResult);

      expect(appController.getVideos()).toBe(serviceResult);
    });
  });
});
