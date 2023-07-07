import { Injectable } from '@nestjs/common';
import { InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client, Guild } from 'discord.js';

@Injectable()
export class GuildCreateEvent {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @On('guildCreate')
  async onGuild(guild: Guild): Promise<void> {
    console.log(`guild joined, guildId: ${guild.id}, name: ${guild.name}`);
  }
}
