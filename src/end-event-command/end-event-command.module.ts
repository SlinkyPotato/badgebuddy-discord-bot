import { Logger, Module } from '@nestjs/common';
import { EndEventCommandService } from './end-event-command.service';
import { DiscordModule } from '@discord-nestjs/core';
import { CommunityEventsApiModule } from '@/api/community-events/community-events-api.module';

@Module({
  imports: [
    DiscordModule.forFeature(),
    CommunityEventsApiModule
  ],
  providers: [
    Logger,
    EndEventCommandService
  ]
})
export class EndEventCommandModule {}
