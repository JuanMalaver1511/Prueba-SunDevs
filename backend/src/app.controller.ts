import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'Backend activo',
      endpoint: '/api/videos',
    };
  }
}
