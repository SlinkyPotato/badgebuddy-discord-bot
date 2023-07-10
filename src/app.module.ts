import { Logger, Module } from '@nestjs/common';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { EventsModule } from './events/events.module';
import { CommandsModule } from './commands/commands.module';
import { APP_GUARD } from '@nestjs/core';
import { GuildServerGuard } from './guards/guild-server.guard';

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
    EventsModule,
    CommandsModule,
  ],
  providers: [Logger, { provide: APP_GUARD, useClass: GuildServerGuard }],
})
export class AppModule {}
