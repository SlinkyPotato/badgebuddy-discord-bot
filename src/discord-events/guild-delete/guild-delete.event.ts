import { Injectable, Logger } from '@nestjs/common';
import { On } from '@discord-nestjs/core';
import { Guild } from 'discord.js';
import { EventsApiService } from '../../repository/events-api/events-api.service';

@Injectable()
export class GuildDeleteEvent {
  private readonly logger: Logger = new Logger(GuildDeleteEvent.name);

  constructor(private eventsApiService: EventsApiService) {}

  @On('guildDelete')
  onGuild(guild: Guild): void {
    this.logger.log(`guild left, guildId: ${guild.id}, name: ${guild.name}`);
    this.eventsApiService.deleteRegistration(guild.id.toString());
  }
}
