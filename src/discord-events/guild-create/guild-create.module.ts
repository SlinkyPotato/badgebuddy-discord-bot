import { Module } from '@nestjs/common';
import { GuildCreateEvent } from './guild-create.event';
import { GuildCreateService } from './guild-create.service';
import { GuildsApiModule } from '../../api/guilds/guilds-api.module';

@Module({
  imports: [GuildsApiModule],
  providers: [GuildCreateEvent, GuildCreateService],
})
export class GuildCreateModule {}
