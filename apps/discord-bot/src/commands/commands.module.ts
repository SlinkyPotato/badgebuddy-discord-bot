import { Logger, Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { StartModule } from './start/start.module';
import { EndModule } from './end/end.module';
import { SetupModule } from './setup/setup.module';

@Module({
  imports: [HelpModule, StartModule, EndModule, SetupModule],
  providers: [Logger],
})
export class CommandsModule {}
