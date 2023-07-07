import { Injectable } from '@nestjs/common';
import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Client, Guild, Message } from 'discord.js';

@Injectable()
export class ReadyEvent {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once(`ready`)
  onReady(): void {
    console.log('discord client is ready');
  }
}
