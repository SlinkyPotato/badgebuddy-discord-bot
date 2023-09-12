import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { CommandsModule } from './commands/commands.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  configureCacheOptions,
  joiValidationConfig,
  configureDiscordOptions,
} from '@solidchain/badge-buddy-common';
import { CacheModule } from '@nestjs/cache-manager';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      cache: true,
      validationSchema: joiValidationConfig,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) =>
        configureCacheOptions(configService),
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configureDiscordOptions(configService),
    }),
    CommandsModule,
    ApiModule,
  ],
})
export class AppModule {}
