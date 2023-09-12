import {
  CommonPinoLogger,
  CommonPinoLoggerService,
} from '@solidchain/badge-buddy-common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export default async function bootstrap() {
  const pinoLogger = new CommonPinoLogger('badge-buddy-bot');
  const pinoLoggerService = new CommonPinoLoggerService(pinoLogger);
  await NestFactory.createApplicationContext(AppModule, {
    logger: pinoLoggerService,
  });
}
