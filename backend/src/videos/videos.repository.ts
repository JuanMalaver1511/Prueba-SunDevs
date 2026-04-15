import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  RawYoutubeResponse,
  RawYoutubeVideoItem,
} from './interfaces/raw-youtube-response.interface';

@Injectable()
export class VideosRepository {
  private readonly mockFilePath = join(process.cwd(), 'mock-youtube-api.json');

  findAll(): RawYoutubeVideoItem[] {
    const rawPayload = this.readMockResponse();
    return rawPayload.items ?? [];
  }

  private readMockResponse(): RawYoutubeResponse {
    const fileContents = readFileSync(this.mockFilePath, 'utf-8');
    return JSON.parse(fileContents) as RawYoutubeResponse;
  }
}
