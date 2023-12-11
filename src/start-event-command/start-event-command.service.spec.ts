import { Test, TestingModule } from '@nestjs/testing';
import { StartEventCommandService } from './start-event-command.service';

describe('StartEventCommandService', () => {
  let service: StartEventCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartEventCommandService],
    }).compile();

    service = module.get<StartEventCommandService>(StartEventCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
