import { Module } from '@nestjs/common';
import { ReadyEvent } from './ready.event';
import { GuildCreateEvent } from './guild-create.event';
import { SetupModule } from './setup/setup.module';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature(), SetupModule],
  providers: [ReadyEvent, GuildCreateEvent],
})
export class EventsModule {}
