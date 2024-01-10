import { CommunityEventsManageApiService } from './community-events-manage-api.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthRequestInterceptor } from '@/api/auth/auth-request.interceptor';
import { AuthResponseInterceptor } from '@/api/auth/auth-response.interceptor';
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals';

describe('CommunityEventsManageApiService', () => {
  let service: CommunityEventsManageApiService;

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
        CommunityEventsManageApiService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: Logger, useValue: mockLogger },
        { provide: HttpService, useValue: jest.fn() },
        { provide: AuthRequestInterceptor, useValue: jest.fn() },
        { provide: AuthResponseInterceptor, useValue: jest.fn() },
      ],
    }).compile();

    service = testModule.get<CommunityEventsManageApiService>(
      CommunityEventsManageApiService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
