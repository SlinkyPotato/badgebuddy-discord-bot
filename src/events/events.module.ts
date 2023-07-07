import { Module } from '@nestjs/common';
import { ReadyEvent } from './ready.event';
import { GuildCreateEvent } from './guild-create.event';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [ReadyEvent, GuildCreateEvent],
})
export class EventsModule {}
