import { Logger, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { StartCommand } from './start.command';
import { StartService } from './start.service';
import { GuildsApiModule } from '../../api/guilds/guilds-api.module';

@Module({
  imports: [DiscordModule.forFeature(), GuildsApiModule],
  providers: [StartCommand, StartService, Logger],
})
export class StartModule {}
