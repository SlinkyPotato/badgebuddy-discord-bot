import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Client } from 'discord.js';

@Injectable()
export class ReadyEvent {
  private readonly logger = new Logger(ReadyEvent.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once(`ready`)
  onReady(): void {
    this.logger.log('discord client is ready');
  }
}
