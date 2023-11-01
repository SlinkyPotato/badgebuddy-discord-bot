import { Logger, Module } from '@nestjs/common';
import { GuildsApiService } from './guilds-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GuildsApiService, Logger],
  exports: [GuildsApiService],
})
export class GuildsApiModule {}
