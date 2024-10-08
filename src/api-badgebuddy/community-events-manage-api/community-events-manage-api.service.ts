import { ENV_BADGEBUDDY_API_HOST } from '@/app.constants';
import {
  CommunityEventsManageDiscordEndEventRequestDto,
  CommunityEventsManageDiscordEndEventResponseDto,
  CommunityEventsManageDiscordStartEventRequestDto,
  CommunityEventsManageDiscordStartEventResponseDto,
} from '@badgebuddy/common';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AuthApiService } from '@/api-badgebuddy/auth-api/auth-api.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class CommunityEventsManageApiService implements OnModuleInit {
  static readonly BASE_PATH = '/community-events/manage/discord' as const;

  constructor(
    private configService: ConfigService,
    private logger: Logger,
    private readonly httpService: HttpService,
    private readonly authApiService: AuthApiService,
  ) {}

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(
      this.authApiService.organizerRequestInterceptor().interceptor,
    );
  }

  /**
   * Start a community event
   * @param request
   */
  async startEvent(
    request: CommunityEventsManageDiscordStartEventRequestDto,
  ): Promise<CommunityEventsManageDiscordStartEventResponseDto> {
    this.logger.verbose(
      `attempting to call post events endpoint, guildSId: ${request.guildSId}, organizerSId: ${request.organizerSId}`,
    );
    const postEventsUrl = `${this.configService.get(ENV_BADGEBUDDY_API_HOST)}${
      CommunityEventsManageApiService.BASE_PATH
    }`;
    let response: AxiosResponse<CommunityEventsManageDiscordStartEventResponseDto>;
    try {
      response = await firstValueFrom(
        this.httpService.post<CommunityEventsManageDiscordStartEventResponseDto>(
          postEventsUrl,
          request,
        ),
      );
    } catch (error) {
      this.logger.error(
        `failed to start event for guild: ${request.guildSId}, organizer: ${request.organizerSId}`,
      );
      throw error;
    }
    if (response.status !== 201) {
      this.logger.verbose(response);
      throw new Error(`status code: ${response.status}`);
    }
    this.logger.verbose(
      `successfully called post events endpoint, response: ${JSON.stringify(
        response.data,
      )}`,
    );
    return response.data;
  }

  /**
   * End a community event
   * @param request
   */
  async endEvent(
    request: CommunityEventsManageDiscordEndEventRequestDto,
  ): Promise<CommunityEventsManageDiscordEndEventResponseDto> {
    this.logger.log('attempting to call put events endpoint');
    const url = `${this.configService.get(ENV_BADGEBUDDY_API_HOST)}${
      CommunityEventsManageApiService.BASE_PATH
    }`;
    let response: AxiosResponse<CommunityEventsManageDiscordEndEventResponseDto>;
    try {
      response = await firstValueFrom(
        this.httpService.patch<CommunityEventsManageDiscordEndEventResponseDto>(
          url,
          request,
        ),
      );
    } catch (error) {
      this.logger.error(
        `failed to end event for guild: ${request.guildSId}`,
      );
      throw error;
    }
    if (response.status !== 200) {
      this.logger.verbose(response);
      throw new Error(`status code: ${response.status}`);
    }
    this.logger.log(
      `successfully stopped event: ${response.data.communityEventId}`,
    );
    return response.data;
  }
}
