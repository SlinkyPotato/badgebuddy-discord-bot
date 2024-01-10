import { Test, TestingModule } from '@nestjs/testing';
import { HelpCommandService } from './help-command.service';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('HelpCommandService', () => {
  let service: HelpCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpCommandService],
    }).compile();

    service = module.get<HelpCommandService>(HelpCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
