import { OrganizerSIdRequestInterceptor } from './organizer-sid-request.interceptor';
import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ConfigService } from '@nestjs/config';
import { AuthApiService } from '@/api-badgebuddy/auth-api/auth-api.service';
import { JwtService } from '@nestjs/jwt';

describe('OrganizerSIdRequestInterceptor', () => {
  let interceptor: OrganizerSIdRequestInterceptor;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        OrganizerSIdRequestInterceptor,
        { provide: Logger, useValue: jest.fn() },
        { provide: ConfigService, useValue: jest.fn() },
        { provide: AuthApiService, useValue: jest.fn() },
        { provide: JwtService, useValue: jest.fn() },
      ],
    }).compile();
    interceptor = testModule.get(OrganizerSIdRequestInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
