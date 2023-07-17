import {
  IsAlphanumeric,
  IsNumberString,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Param } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';

export class StartPOAPDto {
  @IsAlphanumeric('en-US', {
    message: 'The event name must be alphanumeric and less than 250 chars.',
  })
  @Param({
    name: 'event-name',
    description:
      'The name of the event that participants will see during claim.',
    required: true,
    maxLength: 250,
    minLength: 1,
  })
  name: string;

  @Min(10)
  @Max(720)
  @IsNumberString()
  @IsOptional()
  @Param({
    name: 'event-duration-minutes',
    description: 'Number of minutes the event will remain active.',
    required: false,
  })
  duration: string;
}
