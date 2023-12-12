import { Module } from '@nestjs/common';
import {
  CommonConfigModule,
  DiscordConfigModule,
} from '@badgebuddy/common';
import { StartEventCommandModule } from './start-event-command/start-event-command.module';
import { EndEventCommandModule } from './end-event-command/end-event-command.module';
import { ClaimPoapCommandModule } from './claim-poap-command/claim-poap-command.module';
import { DistributePoapCommandModule } from './distribute-poap-command/distribute-poap-command.module';
import { HelpCommandModule } from './help-command/help-command.module';
import Joi from 'joi';

@Module({
  imports: [
    CommonConfigModule.forRoot({
      validationSchema: {
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_CACHE_MIN: Joi.number().required(),
      }
    }),
    DiscordConfigModule.forRootAsync(),
    StartEventCommandModule,
    EndEventCommandModule,
    ClaimPoapCommandModule,
    DistributePoapCommandModule,
    HelpCommandModule,
  ],
})
export class AppModule {}
