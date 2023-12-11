import { Logger, Module } from '@nestjs/common';
import { CommunityEventsApiService } from './community-events-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
  ],
  providers: [
    CommunityEventsApiService,
    Logger,
  ],
  exports: [CommunityEventsApiService],
})
export class CommunityEventsApiModule {}
