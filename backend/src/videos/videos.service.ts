import { Injectable } from '@nestjs/common';
import { VideoResponseDto } from './dto/video-response.dto';
import { VideosMapper } from './videos.mapper';
import { VideosRepository } from './videos.repository';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
    private readonly videosMapper: VideosMapper,
  ) {}

  findAll(): VideoResponseDto[] {
    return this.videosRepository
      .findAll()
      .map((video) => this.videosMapper.toResponseDto(video));
  }
}
