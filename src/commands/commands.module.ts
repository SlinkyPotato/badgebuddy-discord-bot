import { Logger, Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { StartModule } from './start/start.module';
import { EndModule } from './end/end.module';
import { APP_GUARD } from '@nestjs/core';
import { GuildServerGuard } from './_guards/guild-server.guard';

@Module({
  imports: [HelpModule, StartModule, EndModule],
  providers: [{ provide: APP_GUARD, useClass: GuildServerGuard }, Logger],
})
export class CommandsModule {}
