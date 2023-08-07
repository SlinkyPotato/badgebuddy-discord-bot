import { Logger, Module } from '@nestjs/common';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { DiscordEventsModule } from './discord-events/discord-events.module';
import { CommandsModule } from './commands/commands.module';
import { ConfigModule } from './config/config.module';
import { RepositoryModule } from './repository/repository.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    // CacheModule.registerAsync<RedisClientOptions>({
    //   useFactory: async () => ({
    //     store: await redisStore({
    //       socket: {
    //         host: process.env.REDIS_HOST ?? 'localhost',
    //         port: parseInt(process.env.REDIS_PORT ?? '6379'),
    //       },
    //       password: '',
    //       ttl: 60 * 60 * 24 * 7,
    //     }),
    //   }),
    // }),
    DiscordModule.forRootAsync({
      useFactory: (): Promise<DiscordModuleOption> | DiscordModuleOption => ({
        token: process.env.DISCORD_BOT_TOKEN ?? '',
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.MessageContent,
          ],
          partials: [
            Partials.Message,
            Partials.Channel,
            Partials.Reaction,
            Partials.User,
          ],
        },
        failOnLogin: true,
      }),
    }),
    DiscordEventsModule,
    CommandsModule,
    ConfigModule,
    RepositoryModule,
  ],
  providers: [Logger],
})
export class AppModule {}
