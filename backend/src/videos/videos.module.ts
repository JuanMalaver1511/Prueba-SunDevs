import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosMapper } from './videos.mapper';
import { VideosRepository } from './videos.repository';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService, VideosRepository, VideosMapper],
})
export class VideosModule {}
