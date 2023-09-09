import { Module } from '@nestjs/common';
import { GuildsApiService } from './guilds-api.service';

@Module({
  providers: [GuildsApiService],
})
export class GuildsApiModule {}
