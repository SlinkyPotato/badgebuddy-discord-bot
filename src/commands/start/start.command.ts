import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe, ValidationPipe } from '@discord-nestjs/common';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { StartPOAPDto } from './dto/start-poap.dto';
import { GuildServerGuard } from '../_guards/guild-server.guard';
import { StartService } from './start.service';
import { SlashValidationFilter } from '../_filters/slash-validation.filter';
import { Interaction } from 'discord.js';
import { GuildsApiService } from '../../api/guilds/guilds-api.service';
import { UserAuthGuard } from '../_guards/user-auth.guard';
import CommandException from '../_exceptions/command.exception';
import { CommandValidationFilter } from '../_filters/command-validation.filter';

@Command({
  name: 'start',
  description: 'Begin the community event.',
})
export class StartCommand {
  constructor(
    private guildsApiService: GuildsApiService,
    private startService: StartService,
    private readonly logger: Logger,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter, CommandValidationFilter)
  @UseGuards(GuildServerGuard, UserAuthGuard)
  async onStartCommand(
    @IA(SlashCommandPipe, ValidationPipe) startPoapDTO: StartPOAPDto,
    @IA() interaction: Interaction,
  ) {
    this.logger.log(startPoapDTO);
    // return this.startService.initPoapEvent(guildMember, guildDto, startPoapDTO);
    return 'valid';
  }
}
