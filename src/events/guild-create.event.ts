import { Injectable, Logger } from '@nestjs/common';
import { On } from '@discord-nestjs/core';
import { Guild } from 'discord.js';
import { SetupService } from './setup/setup.service';

@Injectable()
export class GuildCreateEvent {
  private readonly logger: Logger = new Logger(GuildCreateEvent.name);

  @On('guildCreate')
  async onGuild(guild: Guild): Promise<void> {
    this.logger.log(`guild joined, guildId: ${guild.id}, name: ${guild.name}`);
    const setupService = new SetupService();
    await setupService.setup(guild);
  }
}
