import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartEventCommandService } from './start-event-command.service';
import { CommunityEventsApiModule } from '@/api/community-events/community-events-api.module';

@Module({
  imports: [
    DiscordModule.forFeature(),
    CommunityEventsApiModule,
  ],
  providers: [
    Logger,
    StartEventCommandService,
  ],
})
export class StartEventCommandModule {}
