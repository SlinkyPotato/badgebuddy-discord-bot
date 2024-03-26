import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { DistributeCommandService } from '@/slash-commands/distribute-command/distribute-command.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [DistributeCommandService, Logger],
})
export class DistributeCommandModule {}
