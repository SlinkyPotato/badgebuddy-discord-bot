import { Module } from '@nestjs/common';
import { ProcessorController } from './processor.controller';
import { ProcessorService } from './processor.service';

@Module({
  imports: [],
  controllers: [ProcessorController],
  providers: [ProcessorService],
})
export class ProcessorModule {}
