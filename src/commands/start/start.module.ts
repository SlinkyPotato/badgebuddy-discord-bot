import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartCommand } from './start.command';
import { CommandsService } from '../commands.service';
import { StartService } from './start.service';
import { GuildsApiService } from '../../api/guilds/guilds-api.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [StartCommand, GuildsApiService, CommandsService, StartService],
})
export class StartModule {}
