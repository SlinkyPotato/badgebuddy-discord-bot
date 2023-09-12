import { Injectable, Logger } from '@nestjs/common';
import { GuildMember } from 'discord.js';
import CommandException from './_exceptions/command.exception';

@Injectable()
export class CommandsService {
  constructor(private readonly logger: Logger) {}

  validateUserAccess(guildMember: GuildMember, poapManagerRoleId: string) {
    if (guildMember.roles.cache.has(poapManagerRoleId)) {
      this.logger.log('user has access validated, userId: ' + guildMember.id);
      return;
    }

    throw new CommandException(
      'Only authorized users can use this command. Please reach out to an admin for configuration help.',
    );
  }
}
