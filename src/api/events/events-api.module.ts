import { Module } from '@nestjs/common';
import { EventsApiService } from './events-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EventsApiService],
  exports: [EventsApiService],
})
export class EventsApiModule {}
