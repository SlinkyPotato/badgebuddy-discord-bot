import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HelpModule } from './help/help.module';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService,
      ): Promise<DiscordModuleOption> | DiscordModuleOption => ({
        token: configService.get('DISCORD_BOT_TOKEN') ?? '',
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
        registerCommandOptions: [
          {
            forGuild: '850840267082563596',
            removeCommandsBefore: true,
          },
        ],
        failOnLogin: true,
      }),
      inject: [ConfigService],
    }),
    HelpModule,
  ],
  providers: [BotGateway, Logger],
})
export class AppModule {}
