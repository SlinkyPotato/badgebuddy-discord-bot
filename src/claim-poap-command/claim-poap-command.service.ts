import { Injectable } from '@nestjs/common';
import { Command } from '@discord-nestjs/core';

@Command({
  name: 'claim',
  description: 'Claim a POAP.',
})
@Injectable()
export class ClaimPoapCommandService {}
