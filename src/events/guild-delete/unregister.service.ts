import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UnregisterService {
  private readonly logger: Logger = new Logger(UnregisterService.name);

  async unregister(guildId: string): Promise<void> {
    this.logger.log(`unregistering guildId: ${guildId}`);
    try {
      const response = await axios.delete(
        `${process.env.BADGE_BUDDY_API_HOST}/registration/${guildId}`,
      );
      if (response.status !== 204) {
        throw new Error(`status code not 201: ${guildId}`);
      }
    } catch (e) {
      this.logger.error(
        `error unregistering guildId: ${guildId}, error: ${e.message}`,
        e,
      );
    }
  }
}
