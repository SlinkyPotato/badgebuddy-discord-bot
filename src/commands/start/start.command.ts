import { Command, Handler, IA } from '@discord-nestjs/core';
import { ValidationPipe } from '@discord-nestjs/common';
import { CommandInteraction, PermissionsBitField } from 'discord.js';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { SetupValidationFilter } from '../filters/setup-validation.filter';
import { GuildServerGuard } from '../guards/guild-server.guard';

@Command({
  name: 'start',
  description: 'Start tracking for the POAP event.',
})
// TODO: Add the correct permissions for this command.
// @Roles(PermissionsBitField.Flags.Administrator)
export class StartCommand {
  private readonly logger = new Logger(StartCommand.name);

  @Handler()
  @UseFilters(SetupValidationFilter)
  @UseGuards(GuildServerGuard)
  async onStartCommand(@IA(ValidationPipe) interaction: CommandInteraction) {
    this.logger.log(interaction);
    // await interaction.reply('replying back!');
    // throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
    return 'Hello from start command!';
  }
}
