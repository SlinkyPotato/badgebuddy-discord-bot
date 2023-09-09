import { Injectable, Logger } from '@nestjs/common';
import { On } from '@discord-nestjs/core';
import { Guild } from 'discord.js';
import { GuildsApiService } from '../../api/guilds/guilds-api.service';

@Injectable()
export class GuildDeleteEvent {
  private readonly logger: Logger = new Logger(GuildDeleteEvent.name);

  constructor(private guildsApiService: GuildsApiService) {}

  @On('guildDelete')
  onGuild(guild: Guild): void {
    this.logger.log(`guild left, guildId: ${guild.id}, name: ${guild.name}`);
    this.guildsApiService.deleteGuild(guild.id.toString());
  }
}
