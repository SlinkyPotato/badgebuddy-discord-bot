import { Command, Handler, IA } from '@discord-nestjs/core';
import { SetupValidationFilter } from './filters/setup-validation.filter';
import { ValidationPipe } from '@discord-nestjs/common';
import { CommandInteraction, PermissionsBitField } from 'discord.js';
import { UseFilters, UseGuards } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { GuildServerGuard } from './guards/guild-server.guard';
import { Roles } from '../../decorators/roles.decorator';

@Command({
  name: 'setup',
  description: 'Configure and setup DEGEN for this discord server.',
})
@Roles(
  PermissionsBitField.Flags.Administrator,
  PermissionsBitField.Flags.ManageGuild,
)
export class SetupCommand {
  @Handler()
  @UseFilters(SetupValidationFilter)
  @UseGuards(RolesGuard, GuildServerGuard)
  async onSetupCommand(@IA(ValidationPipe) interaction: CommandInteraction) {
    console.log(interaction);
    // await interaction.reply('replying back!');
    // throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
    return 'Hello from setup command!';
  }
}
