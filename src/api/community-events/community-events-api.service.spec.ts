import { afterEach, beforeEach, jest } from '@jest/globals';
import { CommunityEventsApiService } from './community-events-api.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { PostEventsRequestDto } from './dto/post-events.request.dto';
import { PostEventsResponseDto } from './dto/post-events.response.dto';
import axios from 'axios';
import { PutEventsRequestDto } from './dto/put-events.request.dto';
import { PutEventsResponseDto } from './dto/put-events.response.dto';

jest.mock('axios');

describe('EventsApiService', () => {
  let service: CommunityEventsApiService;

  const mockConfigService = {
    get: jest.fn().mockReturnThis(),
    post: jest.fn().mockReturnThis(),
  };

  const mockLogger = {
    log: jest.fn().mockReturnThis(),
    verbose: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        CommunityEventsApiService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: Logger, useValue: mockLogger },
      ],
    }).compile();

    service = testModule.get<CommunityEventsApiService>(CommunityEventsApiService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('postEvent', () => {
    it('should be defined', () => {
      expect(service.startEvent).toBeDefined();
    });

    it('should call service.postEvent() and return PostEventsResponseDto', async () => {
      const mockRequest: PostEventsRequestDto = {
        guildId: '850840267082563596',
        eventName: 'test event',
        organizerId: '850843847082563596',
        voiceChannelId: '850843844852563596',
        duration: 30,
      };
      const mockResponse: PostEventsResponseDto = {
        _id: '60b6d7d8a1c5c31b7b6f0f5a',
        startDate: '2021-06-01T00:00:00.000Z',
        endDate: '2021-06-01T23:59:59.999Z',
      };

      (axios as any).post.mockResolvedValue({
        status: 201,
        data: mockResponse,
      });

      const result = await service.startEvent(mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should throw axios error', async () => {
      const mockRequest: PostEventsRequestDto = {
        guildId: '850840267082563596',
        eventName: 'test event',
        organizerId: '850843847082563596',
        voiceChannelId: '850843844852563596',
        duration: 30,
      };
      (axios as any).post.mockRejectedValue(new Error('axios error'));

      try {
        await service.startEvent(mockRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('axios error');
      }
    });

    it('should return status !== 201', async () => {
      const mockRequest: PostEventsRequestDto = {
        guildId: '850840267082563596',
        eventName: 'test event',
        organizerId: '850843847082563596',
        voiceChannelId: '850843844852563596',
        duration: 30,
      };
      (axios as any).post.mockReturnValue({ status: 500 });
      try {
        await service.startEvent(mockRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('status code: 500');
      }
    });
  });

  describe('putEvent', () => {
    it('should be defined', () => {
      expect(service.endEvent).toBeDefined();
    });

    it('should call service.putEvent() and return response', async () => {
      const mockRequest: PutEventsRequestDto = {
        _id: '60b6d7d8a1c5c31b7b6f0f5a',
        guildId: '850840267082563596 ',
        organizerId: '850843847082563596',
        voiceChannelId: '850843844852563596',
      };
      const mockResponse: PutEventsResponseDto = {
        _id: '60b6d7d8a1c5c31b7b6f0f5a',
        isActive: false,
      };
      (axios as any).put.mockResolvedValue({
        status: 200,
        data: mockResponse,
      });
      const result = await service.endEvent(mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should throw axios error', async () => {
      const mockRequest: PutEventsRequestDto = {
        _id: '60b6d7d8a1c5c31b7b6f0f5a',
        guildId: '850840267082563596 ',
        organizerId: '850843847082563596',
        voiceChannelId: '850843844852563596',
      };
      (axios as any).put.mockRejectedValue(new Error('axios error'));

      try {
        await service.endEvent(mockRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('axios error');
      }
    });

    it('should return status !== 200', async () => {
      const mockRequest: PutEventsRequestDto = {
        _id: '60b6d7d8a1c5c31b7b6f0f5a',
        guildId: '850840267082563596 ',
        organizerId: '850843847082563596',
        voiceChannelId: '850843844852563596',
      };
      (axios as any).put.mockReturnValue({ status: 500 });
      try {
        await service.endEvent(mockRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('status code: 500');
      }
    });
  });
});
