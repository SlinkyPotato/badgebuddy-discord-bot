import { Command } from '@discord-nestjs/core';
import { PoapSubCommand } from './poap/poap-sub.command';

@Command({
  name: 'help',
  description: 'Additional information on the POAP distribution commands.',
  include: [PoapSubCommand],
})
export class HelpCommand {}
