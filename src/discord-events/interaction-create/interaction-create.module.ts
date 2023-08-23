import { Module } from '@nestjs/common';
import { InteractionCreateEvent } from './interaction-create.event';

@Module({
  imports: [],
  providers: [InteractionCreateEvent],
})
export class InteractionCreateModule {}
