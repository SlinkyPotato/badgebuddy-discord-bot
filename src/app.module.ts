import { Logger, Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { BotGateway } from './bot.gateway';
import { SetupModule } from './setup/setup.module';

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
    HelpModule,
    SetupModule,
  ],
  providers: [BotGateway, Logger],
})
export class AppModule {}
