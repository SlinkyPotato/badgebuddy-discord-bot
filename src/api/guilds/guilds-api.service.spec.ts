import { beforeEach, describe, jest } from '@jest/globals';
import { GuildsApiService } from './guilds-api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('GuildsApiService', () => {
  let service: GuildsApiService;

  const mockService = {
    get: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildsApiService,
        { provide: ConfigService, useValue: mockService },
      ],
    }).compile();

    service = module.get<GuildsApiService>(GuildsApiService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGuild', () => {
    it('should be defined', () => {
      expect(service.getGuild).toBeDefined();
    });

    it('should call service.getGuild() and return GetGuildResponseDto', async () => {
      const mockRequest = '850840267082563596';
      const mockResponse = {
        _id: '850840267082563596',
        guildId: '850840267082563596',
        guildName: 'test',
        poapManagerRoleId: '850840267082563596',
        privateChannelId: '850840267082563596',
        newsChannelId: '850840267082563596',
      };

      jest.spyOn(service, 'getGuild').mockResolvedValue(mockResponse);

      const result = await service.getGuild(mockRequest);

      expect(result).toEqual(mockResponse);
    });
  });
});
