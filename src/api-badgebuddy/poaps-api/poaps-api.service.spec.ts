import { Test, TestingModule } from '@nestjs/testing';
import { PoapsApiService } from './poaps-api.service';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('PoapsApiService', () => {
  let service: PoapsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoapsApiService],
    }).compile();

    service = module.get<PoapsApiService>(PoapsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
