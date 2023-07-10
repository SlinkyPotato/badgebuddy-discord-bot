import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UnregisterService {
  private readonly logger: Logger = new Logger(UnregisterService.name);

  async unregister(guildId: string): Promise<void> {
    this.logger.log(`unregistering guildId: ${guildId}`);
    const response = await axios.delete(
      `${process.env.BADGE_BUDDY_API_HOST}/registration/${guildId}`,
    );
    if (response.status !== 204) {
      this.logger.error(`error unregistering guildId: ${guildId}`);
    }
  }
}
