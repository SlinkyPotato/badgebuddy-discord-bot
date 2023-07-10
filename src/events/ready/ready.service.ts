import { Injectable, Logger } from '@nestjs/common';
import { Once } from '@discord-nestjs/core';
import { Client } from 'discord.js';

@Injectable()
export class ReadyService {
  private readonly logger = new Logger(ReadyService.name);

  @Once(`ready`)
  onReady(client: Client): void {
    this.logger.log('discord client is ready');
    for (const guild of client.guilds.cache.values()) {
      this.logger.log(`guildId: ${guild.id}, name: ${guild.name}`);
    }
  }
}
