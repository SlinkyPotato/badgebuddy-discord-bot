import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import {
  DiscordBotSettingsGetResponseDto,
} from '@badgebuddy/common';
import { ENV_BADGE_BUDDY_API_HOST } from '@/app.constants';

@Injectable()
export class DiscordBotApiService {
  static readonly BASE_PATH = '/discord/bot' as const;

  constructor(
    private configService: ConfigService, private logger: Logger
  ) {}

  async getDiscordBotSettings(
    guildId: string
  ): Promise<DiscordBotSettingsGetResponseDto> {
    this.logger.verbose(`attempting to get guild from api guildId: ${guildId}`);

    const getGuildsUrl = `${this.configService.get(
      ENV_BADGE_BUDDY_API_HOST,
    )}${DiscordBotApiService.BASE_PATH}/settings?guildSId=${guildId}`;

    try {
      const axiosResponse = await axios.get<DiscordBotSettingsGetResponseDto>(getGuildsUrl);
      if (axiosResponse.status !== 200) {
        this.logger.warn(axiosResponse);
        throw new Error(`status code: ${axiosResponse.status}`);
      }

      this.logger.verbose(`successfully got bot settings, guildId: ${guildId}`);
      return axiosResponse.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

}
