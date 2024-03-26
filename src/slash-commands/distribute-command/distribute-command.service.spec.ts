import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { Logger } from '@nestjs/common';
import { DistributeCommandService } from '@/slash-commands/distribute-command/distribute-command.service';

describe('DistributeCommandService', () => {
  let service: DistributeCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistributeCommandService,
        {
          provide: Logger,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<DistributeCommandService>(DistributeCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
