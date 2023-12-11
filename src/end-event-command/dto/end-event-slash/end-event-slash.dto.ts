import { Channel, Param } from '@discord-nestjs/core';
import { ChannelType } from 'discord.js';

export class EndEventSlashDto {
  @Param({
    name: 'channel',
    description: 'The voice channel or stage for event tracking.',
    required: true,
  })
  @Channel([ChannelType.GuildVoice, ChannelType.GuildStageVoice])
  voiceChannelId: string;
}
