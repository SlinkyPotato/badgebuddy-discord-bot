import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { SetupService } from './setup.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [SetupService],
})
export class SetupModule {}
