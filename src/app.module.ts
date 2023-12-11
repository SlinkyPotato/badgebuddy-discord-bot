import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import {
  CommonConfigModule,
  DiscordConfigModule,
  RedisConfigModule,
} from '@badgebuddy/common';
import { StartEventCommandModule } from './start-event-command/start-event-command.module';
import { EndEventCommandModule } from './end-event-command/end-event-command.module';
import { ClaimPoapCommandModule } from './claim-poap-command/claim-poap-command.module';
import { DistributePoapCommandModule } from './distribute-poap-command/distribute-poap-command.module';
import { HelpCommandModule } from './help-command/help-command.module';

@Module({
  imports: [
    CommonConfigModule.forRoot(),
    RedisConfigModule.forRootAsync(),
    DiscordConfigModule.forRootAsync(),
    StartEventCommandModule,
    EndEventCommandModule,
    ClaimPoapCommandModule,
    DistributePoapCommandModule,
    HelpCommandModule,
  ],
})
export class AppModule {}
