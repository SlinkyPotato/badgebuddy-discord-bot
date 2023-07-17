import { Injectable, Logger } from '@nestjs/common';
import { GuildMember, TextChannel, ThreadChannel } from 'discord.js';
import PostRegistrationDto from '../repository/events-api/dto/post-registration.dto';
import CommandException from './_exceptions/command.exception';

@Injectable()
export class CommandsService {
  private readonly logger: Logger = new Logger(CommandsService.name);

  validateUserAccess(guildMember: GuildMember, poapManagerRoleId: string) {
    if (guildMember.roles.cache.has(poapManagerRoleId)) {
      this.logger.log(
        'user has access to use this command, userId: ' + guildMember.id,
      );
      return;
    }

    throw new CommandException(
      'Only authorized users can use this command. Please reach out to an admin for configuration help.',
    );
  }

  async createPrivateThreadForExecution(
    guildMember: GuildMember,
    guildDTO: PostRegistrationDto,
  ): Promise<ThreadChannel> {
    this.logger.debug('running createPrivateThreadForExecution()');

    const degenCommandsChannel: TextChannel | null =
      (await guildMember.guild.channels
        .fetch(guildDTO.channelId)
        .catch(this.logger.warn)) as TextChannel;

    if (!degenCommandsChannel) {
      throw new CommandException('Please re-invite the bot to your server.');
    }

    this.logger.debug('fetching all threads for discord server');
    await degenCommandsChannel.threads.fetch();
    this.logger.debug('finished fetching all threads for discord server');

    const threadName = `${guildMember.user.username}-${guildMember.user.discriminator}`;
    let thread: ThreadChannel | undefined | null;

    try {
      thread = await degenCommandsChannel.threads.cache.find(
        (t) => t.name == threadName && t.archived == false,
      );
    } catch (e) {
      this.logger.warn(
        `could not find thread, discordUserId: ${guildMember.id}`,
      );
    }

    if (thread == null) {
      this.logger.debug('creating a new thread');
      thread = await degenCommandsChannel.threads.create({
        name: threadName,
        reason: 'POAP session for specific user.',
      });
      this.logger.debug('new thread created');
    }
    this.logger.debug(`found thread ${threadName}`);

    if (thread.joinable) await thread.join();
    this.logger.debug('client joined the new thread');

    await thread.members.add(guildMember);
    this.logger.debug(
      `guildMember: ${guildMember.user.tag}, joined the thread: ${threadName}`,
    );
    return thread;
  }
}
