import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { HelpCommand } from './help.command';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
      },
    }),
    DiscordModule.forFeature(),
  ],
  providers: [HelpCommand],
})
export class HelpModule {}
