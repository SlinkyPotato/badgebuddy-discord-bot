import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommandInteraction } from 'discord.js';
import CommandException from './command.exception';

@Injectable()
export class GuildOnlyGuard implements CanActivate {
  /**
   * Check if the command is being run from a discord server.
   * @param context
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const interaction: CommandInteraction = context.getArgByIndex(0);
    if (interaction.guildId == null || interaction.guildId == '') {
      throw new CommandException('Please run command from a discord server.');
    }
    return true;
  }
}
