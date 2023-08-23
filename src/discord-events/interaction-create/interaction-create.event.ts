import { Logger } from '@nestjs/common';
import { Interaction } from 'discord.js';

export class InteractionCreateEvent {
  private readonly logger = new Logger(InteractionCreateEvent.name);

  constructor() {}
  async handle(interaction: Interaction) {
    if (interaction.isCommand()) {
      const command = interaction.commandName;
      const args = interaction.options;
      await interaction.reply('pong');
    }
  }
}
