import { Injectable, Logger } from '@nestjs/common';
import { GuildMember, TextChannel, ThreadChannel } from 'discord.js';
import PostRegistrationDto from '../repository/events-api/dto/post-registration.dto';
import CommandException from './_exceptions/command.exception';

@Injectable()
export class CommandsService {
  private readonly logger: Logger = new Logger(CommandsService.name);

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