import { Module } from '@nestjs/common';
import { SetupCommand } from './setup.command';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DiscordModule.forFeature(), ConfigModule],
  providers: [SetupCommand],
})
export class SetupModule {}
