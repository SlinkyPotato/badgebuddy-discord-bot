import { Module } from '@nestjs/common';
import { GuildDeleteEvent } from './guild-delete.event';
import { EventsApiService } from '../../repository/events-api/events-api.service';

@Module({
  imports: [],
  providers: [GuildDeleteEvent, EventsApiService],
})
export class GuildDeleteModule {}
