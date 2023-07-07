import { ValidationError } from 'class-validator';
import { ThreadChannel } from 'discord.js';

export class SlashException extends ValidationError {
  message: string;
  thread?: ThreadChannel;

  constructor(message: string, thread?: ThreadChannel) {
    super();
    this.message = message;
    this.thread = thread;
    Object.setPrototypeOf(this, SlashException.prototype);
  }
}
