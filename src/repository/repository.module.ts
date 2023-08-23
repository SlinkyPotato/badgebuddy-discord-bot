import { Module } from '@nestjs/common';
import { EventsApiModule } from './events-api/events-api.module';

@Module({
  imports: [EventsApiModule],
})
export class RepositoryModule {}
