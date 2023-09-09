import { Module } from '@nestjs/common';
import { GuildsApiService } from './guilds-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GuildsApiService],
  exports: [GuildsApiService],
})
export class GuildsApiModule {}
