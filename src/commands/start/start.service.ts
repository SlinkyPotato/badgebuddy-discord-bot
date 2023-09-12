import { Injectable } from '@nestjs/common';
import { GuildMember, ThreadChannel, VoiceChannel } from 'discord.js';
import { StartPOAPDto } from './dto/start-poap.dto';
import { GetGuildResponseDto } from '../../api/guilds/dto/get-guild.response.dto';

@Injectable()
export class StartService {
  constructor() {}
  async initPoapEvent(
    guildMember: GuildMember,
    guildDto: GetGuildResponseDto,
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
