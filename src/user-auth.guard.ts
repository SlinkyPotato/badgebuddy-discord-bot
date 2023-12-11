import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import CommandException from './command.exception';
import {
  DiscordBotApiService
} from '@/api/discord-bot/discord-bot-api.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private discordBotApiService: DiscordBotApiService,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const interaction = context.getArgByIndex(0);
    try {
      const guild = await this.discordBotApiService.getDiscordBotSettings(interaction.guild.id);
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
