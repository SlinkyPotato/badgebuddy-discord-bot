import { Injectable, Logger } from '@nestjs/common';
import { Command, Handler } from '@discord-nestjs/core';

@Command({
  name: 'claim',
  description: 'Claim a POAP.',
})
@Injectable()
export class ClaimCommandService {
  constructor(private readonly logger: Logger) {}

  @Handler()
  onClaimCommand(): void {
    this.logger.log('Claim command received.');
  }
}
