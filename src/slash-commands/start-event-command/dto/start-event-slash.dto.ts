import {
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Channel, Param, ParamType } from '@discord-nestjs/core';
import { Attachment, ChannelType } from 'discord.js';

export class StartEventSlashDto {
  @IsString({
    message: 'The event name must be less than 250 chars.',
  })
  @Param({
    name: 'title',
    description: 'The title of the event.',
    required: true,
    maxLength: 250,
    minLength: 1,
  })
  title: string;

  @Param({
    name: 'channel',
    description: 'The voice channel or stage for event tracking.',
    required: true,
  })
  @Channel([ChannelType.GuildVoice, ChannelType.GuildStageVoice])
  voiceChannelId: string;

  @Min(10)
  @Max(720)
  @IsNumberString()
  @IsOptional()
  @Param({
    name: 'duration',
    description: 'Number of minutes event will remain active.',
    required: false,
  })
  durationInMinutes?: string;

  @IsString()
  @IsOptional()
  @Param({
    name: 'description',
    description: 'A description of the event.',
    required: false,
  })
  description?: string;

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
