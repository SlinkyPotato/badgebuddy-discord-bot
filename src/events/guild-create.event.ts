import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client, Guild } from 'discord.js';

@Injectable()
export class GuildCreateEvent {
  private readonly logger = new Logger(GuildCreateEvent.name);
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @On('guildCreate')
  async onGuild(guild: Guild): Promise<void> {
    this.logger.log(`guild joined, guildId: ${guild.id}, name: ${guild.name}`);
  }
}
