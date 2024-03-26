import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { MintCommandService } from '@/slash-commands/mint-command/mint-command.service';

describe('MintCommandService', () => {
  let service: MintCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintCommandService],
    }).compile();

    service = module.get<MintCommandService>(MintCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
