import { Command, Handler, IA } from '@discord-nestjs/core';
import { ValidationPipe } from '@discord-nestjs/common';
import { CommandInteraction, PermissionsBitField } from 'discord.js';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';

@Command({
  name: 'start',
  description: 'Start tracking for the POAP event.',
})
@Roles(
  PermissionsBitField.Flags.Administrator,
  PermissionsBitField.Flags.ManageGuild,
)
export class StartCommand {
  private readonly logger = new Logger(StartCommand.name);

  @Handler()
  // @UseFilters(SetupValidationFilter)
  // @UseGuards(RolesGuard, GuildServerGuard)
  async onSetupCommand(@IA(ValidationPipe) interaction: CommandInteraction) {
    this.logger.log(interaction);
    // await interaction.reply('replying back!');
    // throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
    return 'Hello from setup command!';
  }
}
