import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { MintCommandService } from '@/slash-commands/mint-command/mint-command.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [MintCommandService, Logger],
})
export class MintCommandModule {}
