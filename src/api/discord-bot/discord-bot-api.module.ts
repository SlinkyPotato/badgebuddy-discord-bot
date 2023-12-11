import { Logger, Module } from '@nestjs/common';
import { DiscordBotApiService } from './discord-bot-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
  ],
  providers: [
    DiscordBotApiService,
    Logger
  ],
  exports: [DiscordBotApiService],
})
export class DiscordBotApiModule {}
