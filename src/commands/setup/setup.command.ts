import { Command, Handler } from '@discord-nestjs/core';
import {
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  PermissionsBitField,
  ApplicationCommandPermissionType,
} from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Command({
  name: 'setup',
  description: 'Setup the bot.',
})
export class SetupCommand {
  constructor(private configService: ConfigService) {}

  @Handler()
  async onSetupCommand(interaction: ChatInputCommandInteraction) {
    console.log(interaction.token);
    // TODO: does not work! Requires a bearer token.
    interaction.guild?.commands.permissions.set({
      command: interaction.command?.id as string,
      token: interaction.token as string,
      permissions: [
        {
          id: '159014522542096384',
          type: ApplicationCommandPermissionType.User,
          permission: true,
        },
      ],
    });

    return 'test';
  }
}
