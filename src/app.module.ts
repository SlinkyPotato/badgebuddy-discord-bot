import { Logger, Module } from '@nestjs/common';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { DiscordEventsModule } from './discord-events/discord-events.module';
import { CommandsModule } from './commands/commands.module';
import { ConfigModule } from './config/config.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
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
