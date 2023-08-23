import { Channel, Param } from '@discord-nestjs/core';
import { ChannelType } from 'discord.js';

export class TestDto {
  @Param({
    name: 'song',
    description: 'name of song',
  })
  song: string;

  @Param({
    name: 'channel',
    description: 'channel to play in',
  })
  @Channel([ChannelType.GuildVoice])
  channel: any;
}
