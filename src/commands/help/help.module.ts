import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { HelpService } from './help.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [HelpService],
})
export class HelpModule {}
