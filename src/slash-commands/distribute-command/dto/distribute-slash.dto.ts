import { Param, ParamType } from '@discord-nestjs/core';
import { Attachment } from 'discord.js';
import { IsUUID } from 'class-validator';

export class DistributeSlashDto {
  @IsUUID()
  @Param({
    name: 'community-event-id',
    description: 'The community event ID.',
    required: true,
  })
  communityEventId: string;

  @Param({
    name: 'links',
    description: 'A list of poaps to be awarded to participants.',
    required: true,
    type: ParamType.ATTACHMENT,
  })
  poapLinks: Attachment;
}
