import { Module } from '@nestjs/common';
import { CommonConfigModule, DiscordConfigModule } from '@badgebuddy/common';
import Joi from 'joi';
import { ApiBadgebuddyModule } from '@/api-badgebuddy/api-badgebuddy.module';
import { SlashCommandsModule } from '@/slash-commands/slash-commands.module';

@Module({
  imports: [
    CommonConfigModule.forRoot({
      validationSchema: {
        REDIS_HOST: Joi.string().optional(),
        REDIS_PORT: Joi.number().optional(),
        REDIS_CACHE_MIN: Joi.number().required(),
        BADGEBUDDY_API_HOST: Joi.string().required(),
        BADGEBUDDY_API_CLIENT_ID: Joi.string().required(),
        BADGEBUDDY_API_CLIENT_SECRET: Joi.string().required(),
      },
    }),
    DiscordConfigModule.forRootAsync(),
    SlashCommandsModule,
    ApiBadgebuddyModule,
  ],
})
export class AppModule {}
