import { Module } from '@nestjs/common';
import { GuildsApiModule } from './guilds/guilds-api.module';
import { EventsApiModule } from './events/events-api.module';

@Module({
  imports: [GuildsApiModule, EventsApiModule],
})
export class ApiModule {}
