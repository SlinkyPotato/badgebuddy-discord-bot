import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Reflector } from '@nestjs/core';
import CommandException from '../_exceptions/command.exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<bigint[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const interaction: CommandInteraction = context.getArgByIndex(0);
    const guildMember: GuildMember = interaction.member as GuildMember;

    if (!requiredRoles || !guildMember) {
      return true;
    }
    if (!requiredRoles.some((role) => guildMember.permissions.has(role))) {
      throw new CommandException(
        'Sorry, only discord admins and managers can configure poap settings.',
      );
    }
    return true;
  }
}
