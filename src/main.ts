import 'dotenv/config'; // must be first import
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ElasticPinoLogger } from './elasticpino.logger';

async function bootstrap() {
  const pinoLogger = new ElasticPinoLogger();
  await NestFactory.createApplicationContext(AppModule, {
    logger: pinoLogger,
  });
}
bootstrap();
