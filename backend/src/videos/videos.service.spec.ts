import { Test, TestingModule } from '@nestjs/testing';
import { VideoResponseDto } from './dto/video-response.dto';
import { RawYoutubeVideoItem } from './interfaces/raw-youtube-response.interface';
import { VideosMapper } from './videos.mapper';
import { VideosRepository } from './videos.repository';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let videosService: VideosService;
  let videosRepository: jest.Mocked<VideosRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        VideosMapper,
        {
          provide: VideosRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    videosService = module.get<VideosService>(VideosService);
    videosRepository = module.get(VideosRepository);
  });

  it('should return cleaned videos', () => {
    const sourceVideos: RawYoutubeVideoItem[] = [
      {
        id: 'vid_001',
        snippet: {
          title: 'React avanzado - Tutorial',
          channelTitle: 'CodeNinja',
          publishedAt: '2025-01-01T00:00:00.000Z',
          thumbnails: {
            high: {
              url: 'https://example.com/react.jpg',
            },
          },
        },
        statistics: {
          viewCount: '100',
          likeCount: '20',
          commentCount: '5',
        },
      },
      {
        id: 'vid_002',
        snippet: {
          title: 'Comentarios cerrados',
          channelTitle: 'BackendBros',
          publishedAt: '2025-01-01T00:00:00.000Z',
          thumbnails: {
            high: {
              url: 'https://example.com/closed.jpg',
            },
          },
        },
        statistics: {
          viewCount: '300',
          likeCount: '40',
        },
      },
    ];

    videosRepository.findAll.mockReturnValue(sourceVideos);

    const result = videosService.findAll();

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(VideoResponseDto);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: 'vid_001',
        thumbnail: 'https://example.com/react.jpg',
        title: 'React avanzado - Tutorial',
        author: 'CodeNinja',
        hypeLevel: 0.5,
      }),
    );
    expect(result[1]).toEqual(
      expect.objectContaining({
        id: 'vid_002',
        hypeLevel: 0,
      }),
    );
  });
});
