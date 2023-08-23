import { Injectable } from '@nestjs/common';
import { GuildMember, ThreadChannel, VoiceChannel } from 'discord.js';
import { CommandsService } from '../commands.service';
import PostRegistrationDto from '../../repository/events-api/dto/post-registration.dto';
import { StartPOAPDto } from './dto/start-poap.dto';

@Injectable()
export class StartService {
  constructor(private commandService: CommandsService) {}
  async initPoapEvent(
    guildMember: GuildMember,
    guildDto: PostRegistrationDto,
    startPoapDTO: StartPOAPDto,
  ) {
    // const thread: ThreadChannel =
    //   await this.commandService.createPrivateThreadForExecution(
    //     guildMember,
    //     guildDto,
    //   );
    // maybe notify the user that the thread was created?
    //
    // return Promise.resolve(undefined);
  }
}
