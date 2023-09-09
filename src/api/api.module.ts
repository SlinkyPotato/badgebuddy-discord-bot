import { Module } from '@nestjs/common';
import { GuildsApiModule } from './guilds/guilds-api.module';

@Module({
  imports: [GuildsApiModule],
})
export class ApiModule {}
