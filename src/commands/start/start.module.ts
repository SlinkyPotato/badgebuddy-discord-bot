import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartService } from './start.service';
import { EventsApiModule } from '../../api/events/events-api.module';
import { GuildsApiModule } from '../../api/guilds/guilds-api.module';

@Module({
  imports: [DiscordModule.forFeature(), EventsApiModule, GuildsApiModule],
  providers: [Logger, StartService],
})
export class StartModule {}
