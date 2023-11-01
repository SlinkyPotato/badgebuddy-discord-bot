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
    const accessToken = '';
    console.log('interactionToken: ', interaction.token);
    console.log('accessToken: ', accessToken);

    const commands = await interaction.guild?.commands.fetch();
    for (const command of commands?.values() as any) {
      console.log(command.name);
    }

    // TODO: does not work! Requires a bearer token.

    // try {
    //   await interaction.guild?.commands.permissions.set({
    //     command: interaction.command?.id as string,
    //     token: accessToken,
    //     permissions: [
    //       {
    //         id: '159014522542096384',
    //         type: ApplicationCommandPermissionType.User,
    //         permission: true,
    //       },
    //     ],
    //   });
    //   console.log('successfully executed setting permissions');
    // } catch (e) {
    //   console.error(e);
    // }
    return 'test';
  }
}
