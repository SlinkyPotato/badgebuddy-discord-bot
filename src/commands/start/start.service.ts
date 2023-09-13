import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe, ValidationPipe } from '@discord-nestjs/common';
import { Injectable, Logger, UseFilters, UseGuards } from '@nestjs/common';
import { StartCommandDto } from './dto/start-command.dto';
import { GuildServerGuard } from '../_guards/guild-server.guard';
import { SlashValidationFilter } from '../_filters/slash-validation.filter';
import { GuildMember, Interaction } from 'discord.js';
import { UserAuthGuard } from '../_guards/user-auth.guard';
import { CommandValidationFilter } from '../_filters/command-validation.filter';
import { EventsApiService } from '../../api/events/events-api.service';
import { PostEventsRequestDto } from '../../api/events/dto/post-events.request.dto';
import CommandException from '../_exceptions/command.exception';

@Command({
  name: 'start',
  description: 'Begin the community event.',
})
@Injectable()
export class StartService {
  constructor(
    private eventsApiService: EventsApiService,
    private readonly logger: Logger,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter, CommandValidationFilter)
  @UseGuards(GuildServerGuard, UserAuthGuard)
  async onStartCommand(
    @IA(SlashCommandPipe, ValidationPipe) startCommandDto: StartCommandDto,
    @IA() interaction: Interaction,
  ) {
    this.logger.verbose(startCommandDto);
    startCommandDto.eventDuration ??= '30';
    const request: PostEventsRequestDto = {
      guildId: interaction.guildId?.toString() as string,
      eventName: startCommandDto.eventName.toString(),
      organizerId: (interaction.member as GuildMember).id.toString() as string,
      voiceChannelId: startCommandDto.eventChannelId,
      duration: Number(startCommandDto.eventDuration),
    };
    this.logger.verbose(request);
    try {
      const communityEvent = await this.eventsApiService.postEvent(request);
      this.logger.verbose(communityEvent);
      return 'Event started!';
    } catch (e) {
      this.logger.error(e);
      throw new CommandException(
        'Failed to start event. Please contact support.',
      );
    }
  }
}
