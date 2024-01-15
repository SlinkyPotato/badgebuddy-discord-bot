import { Logger, Module } from '@nestjs/common';
import { ClaimPoapCommandService } from './claim-poap-command.service';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [ClaimPoapCommandService, Logger],
})
export class ClaimPoapCommandModule {}
