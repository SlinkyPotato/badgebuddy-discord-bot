import { Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { StartModule } from './start/start.module';
import { EndModule } from './end/end.module';
import { CommandsService } from './commands.service';
import { APP_GUARD } from '@nestjs/core';
import { GuildServerGuard } from './_guards/guild-server.guard';

@Module({
  imports: [HelpModule, StartModule, EndModule],
  providers: [
    CommandsService,
    { provide: APP_GUARD, useClass: GuildServerGuard },
  ],
})
export class CommandsModule {}
