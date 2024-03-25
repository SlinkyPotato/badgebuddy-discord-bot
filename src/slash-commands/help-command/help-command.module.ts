import { Module } from '@nestjs/common';
import { HelpCommandService } from './help-command.service';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [HelpCommandService],
})
export class HelpCommandModule {}
