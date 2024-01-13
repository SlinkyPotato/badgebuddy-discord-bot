import { Logger, Module } from '@nestjs/common';
import { DiscordBotApiService } from './discord-bot-api.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [DiscordBotApiService, Logger],
  exports: [DiscordBotApiService],
})
export class DiscordBotApiModule {}
