import {
  DiscordCommunityEventPatchRequestDto,
  DiscordCommunityEventPatchResponseDto,
  DiscordCommunityEventPostRequestDto,
  DiscordCommunityEventPostResponseDto
} from '@badgebuddy/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CommunityEventsApiService {
  constructor(
    private configService: ConfigService, private logger: Logger
  ) {}

  async startEvent(
    request: DiscordCommunityEventPostRequestDto,
  ): Promise<DiscordCommunityEventPostResponseDto> {
    this.logger.log('attempting to call post events endpoint');
    const postEventsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/events`;
    try {
      const response = await axios.post<DiscordCommunityEventPostResponseDto>(postEventsUrl, request);
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
    request: DiscordCommunityEventPatchRequestDto
  ): Promise<DiscordCommunityEventPatchResponseDto> {
    this.logger.log('attempting to call put events endpoint');
    const url = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/events`;
    try {
      const response = await axios.patch<DiscordCommunityEventPatchResponseDto>(url, request);
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
