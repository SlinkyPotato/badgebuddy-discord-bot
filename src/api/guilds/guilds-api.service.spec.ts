import { beforeEach, describe, expect, jest } from '@jest/globals';
import { GuildsApiService } from './guilds-api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PostGuildRequestDto } from './dto/post-guild.request.dto';
import { PostGuildResponseDto } from './dto/post-guild.response.dto';

jest.mock('axios');

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
        _id: '64e76ac997f0abc13a431902',
        guildId: '850840267082563596',
        guildName: 'test event',
        poapManagerRoleId: '1130525129131167786',
        privateChannelId: '1100470846490951790',
        newsChannelId: '1130525131937161286',
      };

      (axios as any).get.mockResolvedValue({
        status: 200,
        data: mockResponse,
      });

      const result = await service.getGuild(mockRequest);

      expect(result).toEqual(mockResponse);
    });

    it('should throw axios error', async () => {
      const mockRequest = '850840267082563596';
      const mockError = new Error('axios error');

      (axios as any).get.mockRejectedValue(new Error('axios error'));
      try {
        await service.getGuild(mockRequest);
      } catch (e) {
        expect(e).toEqual(mockError);
        expect(e.message).toEqual(mockError.message);
      }
    });

    it('should return status !== 200', async () => {
      const mockRequest = '850840267082563596';

      (axios as any).get.mockResolvedValue({ status: 500 });
      try {
        await service.getGuild(mockRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('status code: 500');
      }
    });
  });

  describe('postGuild', () => {
    it('should be defined', () => {
      expect(service.postGuild).toBeDefined();
    });

    it('should call service.postGuild() and return PostGuildResponseDto', async () => {
      const mockRequest: PostGuildRequestDto = {
        guildId: '850840267082563596',
        guildName: 'test event',
        privateChannelId: '1100470846490951790',
        poapManagerRoleId: '1130525129131167786',
        newsChannelId: '1130525131937161286',
      };
      const mockResponse: PostGuildResponseDto = {
        _id: '64e76ac997f0abc13a431902',
        guildId: '850840267082563596',
      };

      (axios as any).post.mockResolvedValue({
        status: 201,
        data: mockResponse,
      });

      const result = await service.postGuild(mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should throw axios error', async () => {
      const mockRequest: PostGuildRequestDto = {
        guildId: '850840267082563596',
        guildName: 'test event',
        privateChannelId: '1100470846490951790',
        poapManagerRoleId: '1130525129131167786',
        newsChannelId: '1130525131937161286',
      };
      const mockError = new Error('axios error');
      (axios as any).post.mockRejectedValue(mockError);
      try {
        await service.postGuild(mockRequest);
      } catch (e) {
        expect(e).toEqual(mockError);
      }
    });

    it('should return status !== 201', async () => {
      const mockRequest: PostGuildRequestDto = {
        guildId: '850840267082563596',
        guildName: 'test event',
        privateChannelId: '1100470846490951790',
        poapManagerRoleId: '1130525129131167786',
        newsChannelId: '1130525131937161286',
      };
      (axios as any).post.mockResolvedValue({ status: 500 });
      try {
        await service.postGuild(mockRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('status code: 500');
      }
    });
  });

  describe('deleteGuild', () => {
    it('should be defined', () => {
      expect(service.deleteGuild).toBeDefined();
    });

    it('should call service.deleteGuild() and return void', async () => {
      const mockRequest = '850840267082563596';
      (axios as any).delete.mockResolvedValue({ status: 204 });
      const result = await service.deleteGuild(mockRequest);
      expect(result).toBeUndefined();
    });

    it('should throw axios error', async () => {
      const mockRequest = '850840267082563596';
      const mockError = new Error('axios error');
      (axios as any).delete.mockRejectedValue(mockError);
      try {
        await service.deleteGuild(mockRequest);
      } catch (e) {
        expect(e).toEqual(mockError);
      }
    });

    it('should return status !== 204', async () => {
      const mockRequest = '850840267082563596';
      (axios as any).delete.mockResolvedValue({ status: 500 });
      try {
        await service.deleteGuild(mockRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('status code: 500');
      }
    });
  });
});
