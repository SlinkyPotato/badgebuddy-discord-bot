import { Logger, Module } from '@nestjs/common';
import { CommunityEventsManageApiService } from './community-events-manage-api.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthApiModule } from '../auth-api/auth-api.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthApiModule,
  ],
  providers: [
    CommunityEventsManageApiService,
    Logger,
  ],
  exports: [CommunityEventsManageApiService],
})
export class CommunityEventsManageApiModule {}
