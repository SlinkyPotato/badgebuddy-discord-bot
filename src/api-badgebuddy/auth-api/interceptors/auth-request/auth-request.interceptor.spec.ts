import { AuthRequestInterceptor } from './auth-request.interceptor';
import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ConfigService } from '@nestjs/config';
import { AuthApiService } from '@/api-badgebuddy/auth-api/auth-api.service';

describe('AuthRequestInterceptor', () => {
  let interceptor: AuthRequestInterceptor;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        AuthRequestInterceptor,
        { provide: Logger, useValue: jest.fn() },
        { provide: ConfigService, useValue: jest.fn() },
        { provide: AuthApiService, useValue: jest.fn() },
      ],
    }).compile();
    interceptor = testModule.get(AuthRequestInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
