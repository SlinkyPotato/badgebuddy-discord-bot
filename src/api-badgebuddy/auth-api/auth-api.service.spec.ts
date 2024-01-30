import { Test, TestingModule } from '@nestjs/testing';
import { AuthApiService } from './auth-api.service';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { OrganizerSIdRequestInterceptor } from '@/api-badgebuddy/auth-api/interceptors/organizer-sid-request/organizer-sid-request.interceptor';

describe('AuthService', () => {
  let service: AuthApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthApiService,
        { provide: OrganizerSIdRequestInterceptor, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<AuthApiService>(AuthApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
