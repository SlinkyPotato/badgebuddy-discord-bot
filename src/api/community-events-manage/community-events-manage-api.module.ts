import { Logger, Module } from '@nestjs/common';
import { CommunityEventsManageApiService } from './community-events-manage-api.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
  ],
  providers: [
    CommunityEventsManageApiService,
    Logger,
  ],
  exports: [CommunityEventsManageApiService],
})
export class CommunityEventsManageApiModule {}
