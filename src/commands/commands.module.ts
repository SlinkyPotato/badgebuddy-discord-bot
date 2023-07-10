import { Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';
import { StartModule } from './start/start.module';
import { ScheduleModule } from './schedule/schedule.module';
import { MintModule } from './mint/mint.module';
import { EndModule } from './end/end.module';

@Module({
  imports: [HelpModule, StartModule, ScheduleModule, MintModule, EndModule],
  providers: [],
})
export class CommandsModule {}
