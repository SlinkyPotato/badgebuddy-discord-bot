import { Channel, Param, ParamType } from '@discord-nestjs/core';
import { IsOptional } from 'class-validator';
import { Attachment, ChannelType } from 'discord.js';

export class EndEventSlashDto {
  @Param({
    name: 'channel',
    description: 'The voice channel or stage for event tracking.',
    required: true,
    type: ParamType.STRING,
  })
  @Channel([ChannelType.GuildVoice, ChannelType.GuildStageVoice])
  voiceChannelId: string;

  @IsOptional()
  @Param({
    name: 'links',
    description: 'A list of poaps to be awarded to participants.',
    required: false,
    type: ParamType.ATTACHMENT,
  })
  poapLinks?: Attachment;
}
