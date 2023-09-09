import { Module } from '@nestjs/common';
import { GuildDeleteEvent } from './guild-delete.event';
import { GuildsApiModule } from '../../api/guilds/guilds-api.module';

@Module({
  imports: [GuildsApiModule],
  providers: [GuildDeleteEvent],
})
export class GuildDeleteModule {}
