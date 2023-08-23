import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe, ValidationPipe } from '@discord-nestjs/common';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { StartPOAPDto } from './dto/start-poap.dto';
import { EventsApiService } from '../../repository/events-api/events-api.service';
import { CommandsService } from '../commands.service';
import { GuildServerGuard } from '../_guards/guild-server.guard';
import { StartService } from './start.service';
import { SlashValidationFilter } from '../_filters/slash-validation.filter';
import { GuildMember, Interaction } from 'discord.js';

@Command({
  name: 'start',
  description: 'Start tracking for the POAP event.',
})
// TODO: Add the correct permissions for this command.
// @Roles(PermissionsBitField.Flags.Administrator)
export class StartCommand {
  private readonly logger = new Logger(StartCommand.name);

  constructor(
    private eventsApiService: EventsApiService,
    private commandsService: CommandsService,
    private startService: StartService,
  ) {}

  @Handler()
  @UseFilters(SlashValidationFilter)
  @UseGuards(GuildServerGuard)
  async onStartCommand(
    @IA(SlashCommandPipe, ValidationPipe) startPoapDTO: StartPOAPDto,
    @IA() interaction: Interaction,
  ) {
    this.logger.log(startPoapDTO);
    const guildMember: GuildMember = interaction.member as GuildMember;
    const guildDto = await this.eventsApiService.getRegistration(
      guildMember.guild.id,
    );
    this.commandsService.validateUserAccess(guildMember, guildDto.roleId);
    return this.startService.initPoapEvent(guildMember, guildDto, startPoapDTO);
  }
}
