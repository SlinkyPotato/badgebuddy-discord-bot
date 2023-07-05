import 'dotenv/config'; // must be first import
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client, GatewayIntentBits } from 'discord.js';
import { ElasticPinoLogger } from './elasticpino.logger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  // const client = new Client({
  //   intents: [
  //     GatewayIntentBits.Guilds,
  //     GatewayIntentBits.GuildEmojisAndStickers,
  //     GatewayIntentBits.GuildVoiceStates,
  //     GatewayIntentBits.GuildMessages,
  //     GatewayIntentBits.GuildMessageReactions,
  //     GatewayIntentBits.DirectMessages,
  //     GatewayIntentBits.DirectMessageReactions,
  //     GatewayIntentBits.GuildMembers,
  //     GatewayIntentBits.MessageContent,
  //   ],
  // });
  // await client.login(process.env.DISCORD_BOT_TOKEN);
  // client.on('ready', () => {
  //   client.guilds.cache.forEach((guild) => {
  //     console.log(guild.name);
  //   });
  //   console.log('discord bot ready');
  // });
  //
  // client.once('messageCreate', (message) => {
  //   console.log('message created');
  //   console.log(message);
  // });
  //
  // client.on('error', (error) => {
  //   console.log('error');
  //   console.log(error);
  // });

  const pinoLogger = new ElasticPinoLogger();
  await NestFactory.createApplicationContext(AppModule);
  // await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter({
  //     logger: false,
  //   }),
  //   {
  //     logger: pinoLogger,
  //   },
  // );
}
bootstrap();
