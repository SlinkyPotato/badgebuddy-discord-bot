import { Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { SetupModule } from './setup/setup.module';

@Module({
  imports: [HelpModule, SetupModule],
  providers: [],
})
export class CommandsModule {}
