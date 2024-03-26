import { Test, TestingModule } from '@nestjs/testing';
import { PoapsApiService } from './poaps-api.service';
import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('PoapsApiService', () => {
  let service: PoapsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoapsApiService,
        {
          provide: Logger,
          useValue: jest.fn(),
        },
        { provide: HttpService, useValue: jest.fn() },
        { provide: ConfigService, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<PoapsApiService>(PoapsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
