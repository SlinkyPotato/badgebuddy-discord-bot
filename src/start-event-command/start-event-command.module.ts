import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ApiModule } from '@/api/api.module';

@Module({
  imports: [
    DiscordModule.forFeature(),
    ApiModule,
  ],
  providers: [
    Logger,
  ],
})
export class StartEventCommandModule {}
