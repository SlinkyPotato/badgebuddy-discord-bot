import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SlashException } from '../../exceptions/slash.exception';
import { CommandInteraction } from 'discord.js';

@Injectable()
export class GuildServerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const interaction: CommandInteraction = context.getArgByIndex(0);
    if (interaction.guildId == null || interaction.guildId == '') {
      throw new SlashException('Please setup from a discord server.');
    }
    return true;
  }
}
