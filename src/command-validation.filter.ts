import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Colors, Message } from 'discord.js';
import { WrongArgsException } from '@discord-nestjs/common';
import CommandException from './command.exception';

@Catch(CommandException)
export class CommandValidationFilter implements ExceptionFilter {
  async catch(
    slashError: CommandException | WrongArgsException,
    host: ArgumentsHost,
  ): Promise<void> {
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
