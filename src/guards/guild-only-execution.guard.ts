import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommandInteraction } from 'discord.js';
import { SlashException } from '@/exceptions/slash.exception';

@Injectable()
export class GuildOnlyGuard implements CanActivate {
  /**
   * Check if the command is being run from a discord server.
   * @param context
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const interaction = context.getArgByIndex<CommandInteraction>(0);
    if (interaction.guildId == null || interaction.guildId == '') {
      throw new SlashException('Please run command from a discord server.');
    }
    return true;
  }
}
