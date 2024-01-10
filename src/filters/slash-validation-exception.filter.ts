import { ValidationException } from '@/exceptions/validation.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Colors, Interaction } from 'discord.js';

@Catch(ValidationException)
export class SlashValidationExceptionFilter implements ExceptionFilter {
  async catch(error: ValidationException, host: ArgumentsHost): Promise<void> {
    const interaction = host.getArgByIndex<Interaction>(0);

    if (interaction.isRepliable()) {
      await interaction.reply({
        embeds: [
          {
            title: 'Validation Error',
            description: error.message,
            color: Colors.Red,
          },
        ],
      });
    }
  }
}
