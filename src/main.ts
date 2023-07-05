import 'dotenv/config'; // must be first import
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ElasticPinoLogger } from './elasticpino.logger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const pinoLogger = new ElasticPinoLogger();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: pinoLogger.logger,
    }),
    {
      logger: pinoLogger,
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Badge Buddy API')
    .setDescription('The Badge Buddy API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // accept connections to other hosts
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
