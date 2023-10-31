import { Controller, Get } from '@nestjs/common';
import { ProcessorService } from './processor.service';

@Controller()
export class ProcessorController {
  constructor(private readonly processorService: ProcessorService) {}

  @Get()
  getHello(): string {
    return this.processorService.getHello();
  }
}
