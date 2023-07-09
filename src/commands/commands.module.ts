import { Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { StartModule } from './start/start.module';

@Module({
  imports: [HelpModule, StartModule],
  providers: [],
})
export class CommandsModule {}
