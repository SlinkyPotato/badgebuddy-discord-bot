import { Module } from '@nestjs/common';
import { GuildDeleteService } from './guild-delete.service';
import { UnregisterService } from './unregister.service';

@Module({
  imports: [],
  providers: [GuildDeleteService, UnregisterService],
})
export class GuildDeleteModule {}
