import { ENV_BADGE_BUDDY_API_HOST } from '@/app.constants';
import {
  CommunityEventsManageDiscordDeleteRequestDto,
  CommunityEventsManageDiscordDeleteResponseDto,
  CommunityEventsManageDiscordPostRequestDto,
  CommunityEventsManageDiscordPostResponseDto,
} from '@badgebuddy/common';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRequestInterceptor } from '@/api-badgebuddy/auth-api/interceptors/auth-request/auth-request.interceptor';
import { firstValueFrom } from 'rxjs';
import { AuthResponseInterceptor } from '@/api-badgebuddy/auth-api/interceptors/auth-response/auth-response.interceptor';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

@Injectable()
export class CommunityEventsManageApiService implements OnModuleInit {
  static readonly BASE_PATH = '/discord/community-events/manage' as const;

  constructor(
    private configService: ConfigService,
    private logger: Logger,
    private readonly httpService: HttpService,
    private readonly authRequestInterceptor: AuthRequestInterceptor,
    private readonly authResponseInterceptor: AuthResponseInterceptor,
  ) {}

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(
      (config: InternalAxiosRequestConfig<{ organizerSId: string }>) => {
        return this.authRequestInterceptor.intercept(config);
      },
    );
    this.httpService.axiosRef.interceptors.response.use(
      (response) => response,
      (
        errorResponse: AxiosResponse & {
          response: { data: { message: string } };
        },
      ) => {
        return this.authResponseInterceptor.intercept(errorResponse);
      },
    );
  }

  async startEvent(
    request: CommunityEventsManageDiscordPostRequestDto,
  ): Promise<CommunityEventsManageDiscordPostResponseDto> {
    this.logger.verbose(
      `attempting to call post events endpoint, guildSId: ${request.guildSId}, organizerSId: ${request.organizerSId}`,
    );
    const postEventsUrl = `${this.configService.get(ENV_BADGE_BUDDY_API_HOST)}${
      CommunityEventsManageApiService.BASE_PATH
    }`;
    try {
      const response = await firstValueFrom(
        this.httpService.post<CommunityEventsManageDiscordPostResponseDto>(
          postEventsUrl,
          request,
        ),
      );
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
    } catch (error) {
      this.logger.error(
        `failed to start event for guild: ${request.guildSId}, organizer: ${request.organizerSId}`,
      );
      throw error;
    }
  }

  async endEvent(
    organizerSId: string,
    request: CommunityEventsManageDiscordDeleteRequestDto,
  ): Promise<CommunityEventsManageDiscordDeleteResponseDto> {
    this.logger.log('attempting to call put events endpoint');
    const url = `${this.configService.get(ENV_BADGE_BUDDY_API_HOST)}${
      CommunityEventsManageApiService.BASE_PATH
    }`;
    try {
      const response = await firstValueFrom(
        this.httpService.patch<CommunityEventsManageDiscordDeleteResponseDto>(
          url,
          {
            organizerSId,
            ...request,
          },
        ),
      );
      if (response.status !== 200) {
        this.logger.verbose(response);
        throw new Error(`status code: ${response.status}`);
      }
      this.logger.log(
        `successfully stopped event: ${response.data.communityEventId}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        `failed to end event for guild: ${request.guildSId}, organizer: ${organizerSId}`,
      );
      throw error;
    }
  }
}
