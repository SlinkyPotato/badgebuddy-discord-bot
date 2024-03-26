import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartEventCommandService } from './start-event-command.service';
import { CommunityEventsManageApiModule } from '@/api-badgebuddy/community-events-manage-api/community-events-manage-api.module';

@Module({
  imports: [DiscordModule.forFeature(), CommunityEventsManageApiModule],
  providers: [Logger, StartEventCommandService],
})
export class StartEventCommandModule {}
