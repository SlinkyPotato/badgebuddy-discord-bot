import { Module } from '@nestjs/common';
import { HelpService } from './help.service';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [HelpService],
})
export class HelpModule {}
