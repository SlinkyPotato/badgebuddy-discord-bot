import { Test, TestingModule } from '@nestjs/testing';
import { EndEventCommandService } from './end-event-command.service';

describe('EndEventCommandService', () => {
  let service: EndEventCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndEventCommandService],
    }).compile();

    service = module.get<EndEventCommandService>(EndEventCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
