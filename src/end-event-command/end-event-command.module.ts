import { Module } from '@nestjs/common';
import { EndEventCommandService } from './end-event-command.service';

@Module({
  providers: [EndEventCommandService]
})
export class EndEventCommandModule {}
