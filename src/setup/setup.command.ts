import { Command, Handler } from '@discord-nestjs/core';

@Command({
  name: 'setup',
  description: 'Configure and setup DEGEN for this discord server.',
})
export class SetupCommand {
  @Handler()
  onSetupCommand() {
    return 'Hello from setup command!';
  }
}
