import { ValidationError } from 'class-validator';
import { ThreadChannel } from 'discord.js';

export default class CommandException extends ValidationError {
  message: string;
  thread?: ThreadChannel;

  constructor(message: string, thread?: ThreadChannel) {
    super();
    this.message = message;
    this.thread = thread;
    Object.setPrototypeOf(this, CommandException.prototype);
  }
}
