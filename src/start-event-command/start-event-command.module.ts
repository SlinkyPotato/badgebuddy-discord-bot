import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartEventCommandService } from './start-event-command.service';
import { CommunityEventsApiModule } from '@/api/community-events/community-events-api.module';
import { DiscordBotApiModule } from '@/api/discord-bot/discord-bot-api.module';

@Module({
  imports: [
    DiscordModule.forFeature(),
    CommunityEventsApiModule,
    DiscordBotApiModule,
  ],
  providers: [
    Logger,
    StartEventCommandService,
  ],
})
export class StartEventCommandModule {}
