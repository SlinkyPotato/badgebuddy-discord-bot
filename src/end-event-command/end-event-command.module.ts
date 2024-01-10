import { Logger, Module } from '@nestjs/common';
import { EndEventCommandService } from './end-event-command.service';
import { DiscordModule } from '@discord-nestjs/core';
import { CommunityEventsManageApiModule } from '@/api/community-events-manage/community-events-manage-api.module';

@Module({
  imports: [
    DiscordModule.forFeature(),
    CommunityEventsManageApiModule
  ],
  providers: [
    Logger,
    EndEventCommandService
  ]
})
export class EndEventCommandModule {}
