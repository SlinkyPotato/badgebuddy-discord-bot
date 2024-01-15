import { Module } from '@nestjs/common';
import { PoapsApiService } from './poaps-api.service';

@Module({
  providers: [PoapsApiService]
})
export class PoapsApiModule {}
