import { Module } from '@nestjs/common';
import { DiscordBotApiModule } from '@/api/discord-bot/discord-bot-api.module';
import { CommunityEventsApiModule } from '@/api/community-events/community-events-api.module';

@Module({
  imports: [
    DiscordBotApiModule,
    CommunityEventsApiModule
  ],
  exports: [ApiModule],
})
export class ApiModule {}
