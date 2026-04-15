import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return {
      message: 'Backend activo',
      endpoint: '/api/videos',
    };
  }

  @Get('api/videos')
  getVideos() {
    return this.appService.getVideos();
  }
}
