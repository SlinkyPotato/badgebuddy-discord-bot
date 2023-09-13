import { Logger, Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { StartModule } from './start/start.module';
import { EndModule } from './end/end.module';

@Module({
  imports: [HelpModule, StartModule, EndModule],
  providers: [Logger],
})
export class CommandsModule {}
