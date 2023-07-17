import { Injectable } from '@nestjs/common';
import { GuildMember, ThreadChannel } from 'discord.js';
import { CommandsService } from '../commands.service';
import PostRegistrationDto from '../../repository/events-api/dto/post-registration.dto';

@Injectable()
export class StartService {
  constructor(private commandService: CommandsService) {}
  async initPoapEvent(guildMember: GuildMember, guildDto: PostRegistrationDto) {
    const thread: ThreadChannel =
      await this.commandService.createPrivateThreadForExecution(
        guildMember,
        guildDto,
      );
    // maybe notify the user that the thread was created?

    return Promise.resolve(undefined);
  }
}
