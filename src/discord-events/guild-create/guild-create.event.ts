import { Injectable, Logger } from '@nestjs/common';
import { On } from '@discord-nestjs/core';
import { Guild } from 'discord.js';
import { GuildCreateService } from './guild-create.service';

@Injectable()
export class GuildCreateEvent {
  private readonly logger: Logger = new Logger(GuildCreateEvent.name);

  constructor(private guildCreateService: GuildCreateService) {}

  @On('guildCreate')
  async onGuildCreate(guild: Guild): Promise<void> {
    this.logger.log(`guild joined, guildId: ${guild.id}, name: ${guild.name}`);
    this.guildCreateService.setup(guild);
  }
}
