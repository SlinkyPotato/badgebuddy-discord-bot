import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe, ValidationPipe } from '@discord-nestjs/common';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { StartPOAPDto } from './dto/start-poap.dto';
import { CommandsService } from '../commands.service';
import { GuildServerGuard } from '../_guards/guild-server.guard';
import { StartService } from './start.service';
import { SlashValidationFilter } from '../_filters/slash-validation.filter';
import { GuildMember, Interaction } from 'discord.js';
import { GuildsApiService } from '../../api/guilds/guilds-api.service';

@Command({
  name: 'start',
  description: 'Start tracking for the POAP event.',
})
// TODO: Add the correct permissions for this command.
// @Roles(PermissionsBitField.Flags.Administrator)
export class StartCommand {
  constructor(
    private guildsApiService: GuildsApiService,
    private commandsService: CommandsService,
    private startService: StartService,
    private readonly logger: Logger,
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
    const guildDto = await this.guildsApiService.getGuild(guildMember.guild.id);
    this.commandsService.validateUserAccess(
      guildMember,
      guildDto.poapManagerRoleId,
    );
    return this.startService.initPoapEvent(guildMember, guildDto, startPoapDTO);
  }
}
