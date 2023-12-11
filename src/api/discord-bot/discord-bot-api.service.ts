import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import {
  DiscordBotSettingsGetResponseDto,
  DiscordBotPostRequestDto,
  DiscordBotPostResponseDto,
} from '@badgebuddy/common';

@Injectable()
export class DiscordBotApiService {
  constructor(
    private configService: ConfigService, private logger: Logger
  ) {}

  async getDiscordBotSettings(
    guildId: string
  ): Promise<DiscordBotSettingsGetResponseDto> {
    this.logger.verbose(`attempting to get guild from api guildId: ${guildId}`);

    const getGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/discord/bot/settings?guildSId=${guildId}`;

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

  async postGuild(
    request: DiscordBotPostRequestDto
  ): Promise<DiscordBotPostResponseDto> {
    this.logger.log('attempting to post guild endpoint');

    const postGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/guilds/${request.guildSId}`;
    const axiosResponse = await axios.post<DiscordBotPostResponseDto>(postGuildsUrl, request);

    if (axiosResponse.status !== 201) {
      this.logger.verbose(axiosResponse);
      throw new Error(`status code: ${axiosResponse.status}`);
    }

    this.logger.log('successfully created guild');
    return axiosResponse.data;
  }

  async deleteGuild(guildId: string): Promise<void> {
    this.logger.log(`attempting to remove guildId: ${guildId}`);
    const deleteGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/guilds/${guildId}`;
    const response = await axios.delete(deleteGuildsUrl);
    if (response.status !== 204) {
      throw new Error(`status code: ${response.status}`);
    }
    this.logger.log(`successfully removed guildId: ${guildId}`);
  }
}
