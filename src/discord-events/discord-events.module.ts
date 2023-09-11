import { Module } from '@nestjs/common';
import { InteractionCreateModule } from './interaction-create/interaction-create.module';

@Module({
  imports: [InteractionCreateModule],
  providers: [],
})
export class DiscordEventsModule {}
