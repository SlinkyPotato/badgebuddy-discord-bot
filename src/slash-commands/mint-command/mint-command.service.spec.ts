import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { MintCommandService } from '@/slash-commands/mint-command/mint-command.service';
import { Logger } from '@nestjs/common';
import { ReflectMetadataProvider } from '@discord-nestjs/core';

describe('MintCommandService', () => {
  let service: MintCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MintCommandService,
        {
          provide: Logger,
          useValue: jest.fn(),
        },
        {
          provide: ReflectMetadataProvider,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<MintCommandService>(MintCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
