import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type RawVideoItem = {
  id: string;
  snippet?: {
    title?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: {
        url?: string;
      };
    };
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
};

type RawYoutubeResponse = {
  items?: RawVideoItem[];
};

export type VideoCard = {
  id: string;
  thumbnail: string;
  title: string;
  author: string;
  publishedRelative: string;
  hypeLevel: number;
};

@Injectable()
export class AppService {
  getVideos(): VideoCard[] {
    const rawPayload = this.readMockResponse();

    return rawPayload.items?.map((item) => this.toVideoCard(item)) ?? [];
  }

  private readMockResponse(): RawYoutubeResponse {
    const filePath = join(process.cwd(), 'mock-youtube-api.json');
    const fileContents = readFileSync(filePath, 'utf-8');

    return JSON.parse(fileContents) as RawYoutubeResponse;
  }

  private toVideoCard(item: RawVideoItem): VideoCard {
    const title = item.snippet?.title ?? 'Sin titulo';
    const author = item.snippet?.channelTitle ?? 'Autor desconocido';
    const publishedAt = item.snippet?.publishedAt ?? '';
    const thumbnail = item.snippet?.thumbnails?.high?.url ?? '';

    return {
      id: item.id,
      thumbnail,
      title,
      author,
      publishedRelative: this.getRelativeTimeLabel(publishedAt),
      hypeLevel: this.getHypeLevel(item),
    };
  }

  private getHypeLevel(item: RawVideoItem): number {
    const stats = item.statistics;

    if (!stats?.commentCount) {
      return 0;
    }

    const views = this.toNumber(stats.viewCount);
    const likes = this.toNumber(stats.likeCount);
    const comments = this.toNumber(stats.commentCount);

    if (views === 0) {
      return 0;
    }

    const isTutorial = /tutorial/i.test(item.snippet?.title ?? '');
    const baseHype = (likes + comments) / views;
    const hypeLevel = isTutorial ? baseHype * 2 : baseHype;

    return Number(hypeLevel.toFixed(4));
  }

  private toNumber(value?: string): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private getRelativeTimeLabel(isoDate: string): string {
    const publishedAt = new Date(isoDate);

    if (Number.isNaN(publishedAt.getTime())) {
      return 'Fecha desconocida';
    }

    const now = new Date();
    const isFuture = publishedAt.getTime() > now.getTime();
    const diffMs = Math.abs(now.getTime() - publishedAt.getTime());

    const minuteMs = 60 * 1000;
    const hourMs = 60 * minuteMs;
    const dayMs = 24 * hourMs;
    const monthMs = 30 * dayMs;
    const yearMs = 365 * dayMs;

    let value = 0;
    let unit = 'minuto';

    if (diffMs >= yearMs) {
      value = Math.floor(diffMs / yearMs);
      unit = value === 1 ? 'ano' : 'anos';
    } else if (diffMs >= monthMs) {
      value = Math.floor(diffMs / monthMs);
      unit = value === 1 ? 'mes' : 'meses';
    } else if (diffMs >= dayMs) {
      value = Math.floor(diffMs / dayMs);
      unit = value === 1 ? 'dia' : 'dias';
    } else if (diffMs >= hourMs) {
      value = Math.floor(diffMs / hourMs);
      unit = value === 1 ? 'hora' : 'horas';
    } else {
      value = Math.max(1, Math.floor(diffMs / minuteMs));
      unit = value === 1 ? 'minuto' : 'minutos';
    }

    return isFuture ? `En ${value} ${unit}` : `Hace ${value} ${unit}`;
  }
}
