import { Module } from '@nestjs/common';
import { StartEventCommandModule } from '@/slash-commands/start-event-command/start-event-command.module';
import { EndEventCommandModule } from '@/slash-commands/end-event-command/end-event-command.module';
import { ClaimCommandModule } from '@/slash-commands/claim-command/claim-command.module';
import { HelpCommandModule } from '@/slash-commands/help-command/help-command.module';
import { DistributeCommandModule } from '@/slash-commands/distribute-command/distribute-command.module';

@Module({
  imports: [
    StartEventCommandModule,
    EndEventCommandModule,
    ClaimCommandModule,
    DistributeCommandModule,
    HelpCommandModule,
  ],
})
export class SlashCommandsModule {}
