import { Logger, Module } from '@nestjs/common';
import { ClaimCommandService } from './claim-command.service';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [ClaimCommandService, Logger],
})
export class ClaimCommandModule {}
