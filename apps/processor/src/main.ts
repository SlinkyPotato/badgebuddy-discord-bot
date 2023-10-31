import { NestFactory } from '@nestjs/core';
import { ProcessorModule } from './processor.module';

async function bootstrap() {
  const app = await NestFactory.create(ProcessorModule);
  await app.listen(3000);
}
bootstrap();
