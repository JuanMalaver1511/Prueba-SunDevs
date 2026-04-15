export class VideoResponseDto {
  id: string;
  thumbnail: string;
  title: string;
  author: string;
  publishedRelative: string;
  hypeLevel: number;

  constructor(params: VideoResponseDto) {
    this.id = params.id;
    this.thumbnail = params.thumbnail;
    this.title = params.title;
    this.author = params.author;
    this.publishedRelative = params.publishedRelative;
    this.hypeLevel = params.hypeLevel;
  }
}
