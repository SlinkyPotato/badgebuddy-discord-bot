import { Command, Handler } from '@discord-nestjs/core';
import { ContextMenuCommandInteraction } from 'discord.js';

@Command({
  name: 'help',
  description: 'Additional information on the POAP distribution commands.',
})
export class HelpCommand {
  @Handler()
  onHelpCommand(interaction: ContextMenuCommandInteraction) {
    return 'help command response';
  }
}
