import { Injectable, Logger } from '@nestjs/common';
import { On } from '@discord-nestjs/core';
import { Guild } from 'discord.js';
import { UnregisterService } from './unregister.service';

@Injectable()
export class GuildDeleteService {
  private readonly logger: Logger = new Logger(GuildDeleteService.name);

  constructor(private unregisterService: UnregisterService) {}

  @On('guildDelete')
  onGuild(guild: Guild): void {
    this.logger.log(`guild left, guildId: ${guild.id}, name: ${guild.name}`);
    this.unregisterService.unregister(guild.id.toString());
  }
}
