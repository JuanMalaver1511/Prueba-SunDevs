import { Controller, Get } from '@nestjs/common';
import { VideoResponseDto } from './dto/video-response.dto';
import { VideosService } from './videos.service';

@Controller('api/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  findAll(): VideoResponseDto[] {
    return this.videosService.findAll();
  }
}
