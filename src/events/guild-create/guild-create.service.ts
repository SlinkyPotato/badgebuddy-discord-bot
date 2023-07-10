import { Injectable, Logger } from '@nestjs/common';
import { On } from '@discord-nestjs/core';
import { Guild } from 'discord.js';
import { SetupService } from './setup.service';

@Injectable()
export class GuildCreateService {
  private readonly logger: Logger = new Logger(GuildCreateService.name);

  constructor(private setupService: SetupService) {}

  @On('guildCreate')
  async onGuildCreate(guild: Guild): Promise<void> {
    this.logger.log(`guild joined, guildId: ${guild.id}, name: ${guild.name}`);
    await this.setupService.setup(guild);
  }
}
