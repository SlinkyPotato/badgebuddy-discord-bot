import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { TestDto } from './test.dto';

@Command({
  name: 'test',
  description: 'Test command',
})
export class TestCommand {
  @Handler()
  onTestCommand(@InteractionEvent(SlashCommandPipe) options: TestDto) {
    return `test ${options.song} ${options.channel}`;
  }
}
