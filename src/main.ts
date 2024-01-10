import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonPinoLogger, CommonPinoLoggerService } from '@badgebuddy/common';

async function bootstrap() {
  const pinoLogger = new CommonPinoLogger('discord-bot');
  const pinoLoggerService = new CommonPinoLoggerService(pinoLogger);
  await NestFactory.createApplicationContext(AppModule, {
    logger: pinoLoggerService,
  });
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
