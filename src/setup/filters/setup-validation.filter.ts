import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Colors, Message } from 'discord.js';
import { SlashException } from '../../exceptions/slash.exception';

@Catch(SlashException)
export class SetupValidationFilter implements ExceptionFilter {
  async catch(slashError: SlashException, host: ArgumentsHost): Promise<void> {
    const interaction = host.getArgByIndex(0);
    if (interaction.isRepliable()) {
      await interaction.reply({
        embeds: [
          {
            title: 'Validation Error',
            description: slashError.message,
            color: Colors.Red,
          },
        ],
      } as Message);
    }
  }
}
