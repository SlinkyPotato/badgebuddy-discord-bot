import { Module } from '@nestjs/common';
import { EventsApiService } from './events-api.service';

@Module({
  providers: [EventsApiService],
})
export class EventsApiModule {}
