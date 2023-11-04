import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { ApiModule } from './api/api.module';
import {
  CommonConfigModule,
  DiscordConfigModule,
  RedisConfigModule,
} from '@badgebuddy/common';

@Module({
  imports: [
    CommonConfigModule.forRoot(),
    RedisConfigModule.forRootAsync(),
    DiscordConfigModule.forRootAsync(),
    CommandsModule,
    ApiModule,
  ],
})
export class AppModule {}
