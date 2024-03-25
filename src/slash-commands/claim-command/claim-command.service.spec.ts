import { Test, TestingModule } from '@nestjs/testing';
import { ClaimCommandService } from './claim-command.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { Logger } from '@nestjs/common';

describe('ClaimCommandService', () => {
  let service: ClaimCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimCommandService,
        {
          provide: Logger,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ClaimCommandService>(ClaimCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
