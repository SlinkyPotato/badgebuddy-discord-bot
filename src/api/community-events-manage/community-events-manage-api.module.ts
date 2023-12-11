import { Logger, Module } from '@nestjs/common';
import { CommunityEventsManageApiService } from './community-events-manage-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
  ],
  providers: [
    CommunityEventsManageApiService,
    Logger,
  ],
  exports: [CommunityEventsManageApiService],
})
export class CommunityEventsManageApiModule {}
