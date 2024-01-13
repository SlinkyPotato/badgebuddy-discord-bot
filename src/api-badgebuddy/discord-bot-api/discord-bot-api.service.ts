import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DiscordBoSettingsGetRequestDto,
  DiscordBotSettingsGetResponseDto,
} from '@badgebuddy/common';
import { ENV_BADGEBUDDY_API_HOST } from '@/app.constants';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DiscordBotApiService {
  static readonly BASE_PATH = '/discord/bot' as const;

  constructor(
    private configService: ConfigService,
    private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Get the discord bot settings for a guild
   * @param guildSId
   * @param botSettingsId
   */
  async getDiscordBotSettings({
    guildSId,
    botSettingsId,
  }: DiscordBoSettingsGetRequestDto): Promise<DiscordBotSettingsGetResponseDto> {
    this.logger.verbose(
      `attempting to get guild from api guildSId: ${guildSId}, botSettingsId: ${botSettingsId}`,
    );

    const url = `${this.configService.get(ENV_BADGEBUDDY_API_HOST)}${
      DiscordBotApiService.BASE_PATH
    }/settings` as const;

    if (guildSId) {
      url.concat(`?guildSId=${guildSId}`);
    } else if (botSettingsId) {
      url.concat(`?botSettingsId=${botSettingsId}`);
    }

    let response: AxiosResponse<DiscordBotSettingsGetResponseDto>;
    try {
      response = await firstValueFrom(
        this.httpService.get<DiscordBotSettingsGetResponseDto>(url),
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }

    if (response.status !== 200) {
      this.logger.warn(response);
      throw new Error(`status code: ${response.status}`);
    }

    this.logger.verbose(
      `successfully got bot settings, guilsSId: ${response.data.guildSId}`,
    );
    return response.data;
  }
}
