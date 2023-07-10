import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ReadyService } from './ready.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [ReadyService],
})
export class ReadyModule {}
