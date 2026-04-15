export interface RawYoutubeThumbnail {
  url?: string;
}

export interface RawYoutubeSnippet {
  title?: string;
  channelTitle?: string;
  publishedAt?: string;
  thumbnails?: {
    high?: RawYoutubeThumbnail;
  };
}

export interface RawYoutubeStatistics {
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

export interface RawYoutubeVideoItem {
  id: string;
  snippet?: RawYoutubeSnippet;
  statistics?: RawYoutubeStatistics;
}

export interface RawYoutubeResponse {
  items?: RawYoutubeVideoItem[];
}
