import { Logger, Module } from '@nestjs/common';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { DiscordEventsModule } from './discord-events/discord-events.module';
import { CommandsModule } from './commands/commands.module';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  configureCacheOptions,
  joiValidationConfig,
} from '@solidchain/badge-buddy-common';
import { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      cache: true,
      validationSchema: joiValidationConfig,
      validationOptions: {},
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) =>
        configureCacheOptions(configService),
    }),
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
    RepositoryModule,
  ],
  providers: [Logger],
})
export class AppModule {}
