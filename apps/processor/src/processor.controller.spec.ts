import { Test, TestingModule } from '@nestjs/testing';
import { ProcessorController } from './processor.controller';
import { ProcessorService } from './processor.service';

describe('ProcessorController', () => {
  let processorController: ProcessorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessorController],
      providers: [ProcessorService],
    }).compile();

    processorController = app.get<ProcessorController>(ProcessorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(processorController.getHello()).toBe('Hello World!');
    });
  });
});
