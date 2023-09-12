import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GuildsApiService } from '../../api/guilds/guilds-api.service';
import CommandException from '../_exceptions/command.exception';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private guildsApiService: GuildsApiService,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const interaction = context.getArgByIndex(0);
    try {
      const guild = await this.guildsApiService.getGuild(interaction.guild.id);
      if (interaction.member.roles.cache.has(guild.poapManagerRoleId)) {
        this.logger.log(`user authorized, userId: ${interaction.member.id}`);
        return true;
      }
    } catch (e) {
      this.logger.error(e);
      throw new CommandException('Error please contact support.');
    }
    throw new CommandException('Not authorized.');
  }
}
