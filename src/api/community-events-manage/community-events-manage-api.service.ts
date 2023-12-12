import { ENV_BADGE_BUDDY_API_HOST } from '@/app.constants';
import {
  DiscordCommunityEventPatchRequestDto,
  DiscordCommunityEventPatchResponseDto,
  DiscordCommunityEventPostRequestDto,
  DiscordCommunityEventPostResponseDto
} from '@badgebuddy/common';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthInterceptor } from '../auth/auth.interceptor';

@Injectable()
export class CommunityEventsManageApiService {
  static readonly BASE_PATH = '/discord/community-events/manage' as const;

  constructor(
    private configService: ConfigService, private logger: Logger,
    private readonly httpService: HttpService,
    private readonly authInterceptor: AuthInterceptor,
  ) {
    this.httpService.axiosRef.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    });
  }

  async startEvent(
    request: DiscordCommunityEventPostRequestDto,
  ): Promise<DiscordCommunityEventPostResponseDto> {
    this.logger.log('attempting to call post events endpoint');
    const postEventsUrl = `${this.configService.get(
      ENV_BADGE_BUDDY_API_HOST,
    )}${CommunityEventsManageApiService.BASE_PATH}}`;
    try {
      const response = await this.httpService.post<DiscordCommunityEventPostResponseDto>(postEventsUrl, request);
      if (response.status !== 201) {
        this.logger.verbose(response);
        throw new Error(`status code: ${response.status}`);
      }
      this.logger.log(`successfully created event: ${response.data.communityEventId}`);
      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async endEvent(
    organizerSId: string, request: DiscordCommunityEventPatchRequestDto
  ): Promise<DiscordCommunityEventPatchResponseDto> {
    this.logger.log('attempting to call put events endpoint');
    const url = `${this.configService.get(
      ENV_BADGE_BUDDY_API_HOST,
    )}${CommunityEventsManageApiService.BASE_PATH}`;
    try {
      const response = await axios.patch<DiscordCommunityEventPatchResponseDto>(url, {
        organizerSId,
        ...request
      });
      if (response.status !== 200) {
        this.logger.verbose(response);
        throw new Error(`status code: ${response.status}`);
      }
      this.logger.log(`successfully stopped event: ${response.data.communityEventId}`);
      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
