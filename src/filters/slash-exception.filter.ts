import { SlashException } from '@/exceptions/slash.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Colors } from 'discord.js';

@Catch(SlashException)
export class SlashExceptionFilter implements ExceptionFilter {
  
  async catch(
    error: Error,
    host: ArgumentsHost,
  ): Promise<void> {
    const interaction = host.getArgByIndex(0);
  
    if (interaction.isRepliable()) {
      await interaction.reply({
        embeds: [
          {
            title: 'Error',
            description: error.message,
            color: Colors.Red,
          }
        ],
      });
    }
  }
}
