import { Module } from '@nestjs/common';
import { HelpModule } from './help/help.module';

@Module({
  imports: [HelpModule],
  providers: [],
})
export class CommandsModule {}
