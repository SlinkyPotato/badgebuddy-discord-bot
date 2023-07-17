import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartCommand } from './start.command';
import { EventsApiService } from '../../repository/events-api/events-api.service';
import { CommandsService } from '../commands.service';
import { StartService } from './start.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [StartCommand, EventsApiService, CommandsService, StartService],
})
export class StartModule {}
