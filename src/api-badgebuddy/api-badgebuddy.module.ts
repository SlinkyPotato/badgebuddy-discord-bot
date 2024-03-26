import { Module } from '@nestjs/common';
import { AuthApiModule } from '@/api-badgebuddy/auth-api/auth-api.module';
import {
  CommunityEventsManageApiModule
} from '@/api-badgebuddy/community-events-manage-api/community-events-manage-api.module';
import {
  DiscordBotApiModule
} from '@/api-badgebuddy/discord-bot-api/discord-bot-api.module';
import { PoapsApiModule } from './poaps-api/poaps-api.module';

@Module({
  imports: [
    AuthApiModule,
    CommunityEventsManageApiModule,
    DiscordBotApiModule,
    PoapsApiModule,
  ]
})
export class ApiBadgebuddyModule {}
