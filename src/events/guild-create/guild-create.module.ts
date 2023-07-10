import { Module } from '@nestjs/common';
import { GuildCreateService } from './guild-create.service';
import { SetupService } from './setup.service';

@Module({
  imports: [],
  providers: [GuildCreateService, SetupService],
})
export class GuildCreateModule {}
