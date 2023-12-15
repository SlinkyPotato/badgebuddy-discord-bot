import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WrongArgsException } from '@discord-nestjs/common';
import { ValidationError } from 'class-validator';
import { Colors, EmbedBuilder } from 'discord.js';

@Catch(WrongArgsException)
export class SlashDtoValidationFilter implements ExceptionFilter {
  
  async catch(
    exceptionList: WrongArgsException,
    host: ArgumentsHost,
  ): Promise<void> {
    const interaction = host.getArgByIndex(0);

    const embeds = exceptionList
      .getError()
      .map((exception: ValidationError) => {
        exception.constraints = exception.constraints as {
          [type: string]: string;
        };
        return new EmbedBuilder()
          .setTitle('Validation Error')
          .setColor(Colors.Red)
          .addFields(
            Object.values(exception.constraints)
              .map((constraint) => {
                return {
                  name: exception.property,
                  value: constraint,
                };
            }),
          );
      });

    if (interaction.isRepliable()) {
      await interaction.reply({
        embeds,
      });
    }
  }
}
