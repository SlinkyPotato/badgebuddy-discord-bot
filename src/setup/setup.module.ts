import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { SetupCommand } from './setup.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [SetupCommand],
})
export class SetupModule {}
