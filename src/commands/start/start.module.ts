import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartCommand } from './start.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [StartCommand],
})
export class StartModule {}
