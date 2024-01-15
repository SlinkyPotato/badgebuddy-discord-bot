import { Test, TestingModule } from '@nestjs/testing';
import { ClaimPoapCommandService } from './claim-poap-command.service';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('ClaimPoapCommandService', () => {
  let service: ClaimPoapCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimPoapCommandService],
    }).compile();

    service = module.get<ClaimPoapCommandService>(ClaimPoapCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
