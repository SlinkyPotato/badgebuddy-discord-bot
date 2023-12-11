import {
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Channel, Param } from '@discord-nestjs/core';
import { ChannelType } from 'discord.js';

export class StartEventDto {
  @IsString({
    message: 'The event name must be less than 250 chars.',
  })
  @Param({
    name: 'title',
    description: 'The name of the event.',
    required: true,
    maxLength: 250,
    minLength: 1,
  })
  eventName: string;

  @Min(10)
  @Max(720)
  @IsNumberString()
  @IsOptional()
  @Param({
    name: 'duration',
    description: 'Number of minutes event will remain active.',
    required: false,
  })
  eventDuration?: string;

  @Param({
    name: 'channel',
    description: 'The voice channel or stage for event tracking.',
    required: true,
  })
  @Channel([ChannelType.GuildVoice, ChannelType.GuildStageVoice])
  eventChannelId: string;
}
