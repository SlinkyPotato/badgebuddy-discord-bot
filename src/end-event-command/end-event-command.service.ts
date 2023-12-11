import { CommunityEventsApiService } from '@/api/community-events/community-events-api.service';
import { CommandExceptionFilter } from '@/command-validation.filter';
import { GuildOnlyGuard } from '@/guild-only-execution.guard';
import { SlashValidationFilter } from '@/slash-validation.filter';
import { Command, Handler } from '@discord-nestjs/core';
import { Injectable, Logger, UseFilters, UseGuards } from '@nestjs/common';

@Command({
  name: 'end-event',
  description: 'End the community event.',
})
@Injectable()
export class EndEventCommandService {

  constructor(
    private readonly logger: Logger,
    private readonly eventsApiService: CommunityEventsApiService,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter, CommandExceptionFilter)
  @UseGuards(GuildOnlyGuard)
  async onEndCommand() {
    return 'Event ended!';
  }
}
