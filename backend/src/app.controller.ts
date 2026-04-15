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

  @Get('api')
  getApiRoot() {
    return {
      message: 'API activa',
      endpoints: ['/api/videos'],
    };
  }
}
