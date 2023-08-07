import { Module } from '@nestjs/common';
import { GuildDeleteModule } from './guild-delete/guild-delete.module';
import { GuildCreateModule } from './guild-create/guild-create.module';
import { ReadyModule } from './ready/ready.module';
import { InteractionCreateModule } from './interaction-create/interaction-create.module';

@Module({
  imports: [ReadyModule, GuildCreateModule, GuildDeleteModule, InteractionCreateModule],
  providers: [],
})
export class DiscordEventsModule {}
