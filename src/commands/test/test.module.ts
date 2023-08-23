import { Module } from '@nestjs/common';
import { TestCommand } from './test.command';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [TestCommand],
})
export class TestModule {}
