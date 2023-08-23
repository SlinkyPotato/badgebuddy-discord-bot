import { Module } from '@nestjs/common';
import { GuildCreateEvent } from './guild-create.event';
import { EventsApiService } from '../../repository/events-api/events-api.service';
import { GuildCreateService } from './guild-create.service';

@Module({
  imports: [],
  providers: [EventsApiService, GuildCreateEvent, GuildCreateService],
})
export class GuildCreateModule {}
