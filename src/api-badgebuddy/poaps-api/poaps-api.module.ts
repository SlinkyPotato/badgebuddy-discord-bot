import { Module } from '@nestjs/common';
import { PoapsApiService } from './poaps-api.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [PoapsApiService],
})
export class PoapsApiModule {}
