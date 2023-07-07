import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { HelpCommand } from './help.command';
import { PoapSubCommand } from './poap/poap-sub.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [HelpCommand, PoapSubCommand],
})
export class HelpModule {}
