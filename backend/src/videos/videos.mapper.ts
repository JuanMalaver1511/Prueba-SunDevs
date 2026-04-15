import { Injectable } from '@nestjs/common';
import { toRelativeTimeLabel } from '../common/utils/relative-time.util';
import { VideoResponseDto } from './dto/video-response.dto';
import { RawYoutubeVideoItem } from './interfaces/raw-youtube-response.interface';

@Injectable()
export class VideosMapper {
  toResponseDto(video: RawYoutubeVideoItem): VideoResponseDto {
    return new VideoResponseDto({
      id: video.id,
      thumbnail: video.snippet?.thumbnails?.high?.url ?? '',
      title: video.snippet?.title ?? 'Sin titulo',
      author: video.snippet?.channelTitle ?? 'Autor desconocido',
      publishedRelative: toRelativeTimeLabel(video.snippet?.publishedAt ?? ''),
      hypeLevel: this.calculateHypeLevel(video),
    });
  }

  private calculateHypeLevel(video: RawYoutubeVideoItem): number {
    const statistics = video.statistics;

    if (!statistics?.commentCount) {
      return 0;
    }

    const views = this.toNumber(statistics.viewCount);

    if (views === 0) {
      return 0;
    }

    const likes = this.toNumber(statistics.likeCount);
    const comments = this.toNumber(statistics.commentCount);
    const baseHype = (likes + comments) / views;
    const tutorialMultiplier = /tutorial/i.test(video.snippet?.title ?? '')
      ? 2
      : 1;

    return Number((baseHype * tutorialMultiplier).toFixed(4));
  }

  private toNumber(value?: string): number {
    const parsedValue = Number(value);

    return Number.isFinite(parsedValue) ? parsedValue : 0;
  }
}
