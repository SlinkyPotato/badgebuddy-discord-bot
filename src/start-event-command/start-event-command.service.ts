import { CommandValidationFilter } from '@/command-validation.filter';
import CommandException from '@/command.exception';
import { GuildOnlyExecutionGuard } from '@/guild-only-execution.guard';
import { SlashValidationFilter } from '@/slash-validation.filter';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { Logger, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { GuildMember, Interaction } from 'discord.js';
import { StartEventDto } from './dto/start-event.dto';
import {
  CommunityEventsApiService
} from '@/api/community-events/community-events-api.service';

@Command({
  name: 'start-event',
  description: 'Begin the community event.',
})
export class StartEventCommandService {
  constructor(
    private eventsApiService: CommunityEventsApiService,
    private readonly logger: Logger,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter, CommandValidationFilter)
  @UseGuards(GuildOnlyExecutionGuard)
  async onStartCommand(
    @IA(SlashCommandPipe, ValidationPipe) startCommandDto: StartEventDto,
    @IA() interaction: Interaction,
  ) {
    this.logger.verbose(startCommandDto);
    startCommandDto.durationInMinutes ??= '30';
    try {
      const communityEvent = await this.eventsApiService.startEvent({
        guildSId: interaction.guildId?.toString() as string,
        title: startCommandDto.title.toString(),
        organizerSId: (interaction.member as GuildMember).id.toString() as string,
        voiceChannelSId: startCommandDto.voiceChannelId,
        endDate: new Date(new Date().getTime() + Number(startCommandDto.durationInMinutes) * 60000).toISOString(),
      });
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
