import { Channel, Param, ParamType } from '@discord-nestjs/core';
import { IsOptional, IsString } from 'class-validator';
import { Attachment, ChannelType } from 'discord.js';

export class EndEventSlashDto {
  @Param({
    name: 'channel',
    description: 'The voice channel or stage for event tracking.',
    required: true,
  })
  @Channel([ChannelType.GuildVoice, ChannelType.GuildStageVoice])
  voiceChannelId: string;

  @IsString()
  @IsOptional()
  @Param({
    name: 'links_txt',
    description: 'A list of poaps to be awarded to participants.',
    required: false,
    type: ParamType.ATTACHMENT,
  })
  poapLinks?: Attachment;
}
