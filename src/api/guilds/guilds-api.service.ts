import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { GetGuildResponseDto } from './dto/get-guild.response.dto';
import { PostGuildRequestDto } from './dto/post-guild.request.dto';
import { PostGuildResponseDto } from './dto/post-guild.response.dto';

@Injectable()
export class GuildsApiService {
  private readonly logger: Logger = new Logger(GuildsApiService.name);

  constructor(private configService: ConfigService) {}

  async getGuild(guildId: string): Promise<GetGuildResponseDto> {
    this.logger.log(`attempting to get guildId: ${guildId}`);

    const getGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/guilds/guildId`;

    const axiosResponse = await axios.get(getGuildsUrl);

    if (axiosResponse.status !== 200) {
      this.logger.verbose(axiosResponse);
      throw new Error(`status code: ${axiosResponse.status}`);
    }

    this.logger.log(`successfully got guildId: ${guildId}`);
    return {
      _id: axiosResponse.data._id,
      guildId: axiosResponse.data.guildId,
      guildName: axiosResponse.data.guildName,
      poapManagerRoleId: axiosResponse.data.poapManagerRoleId,
      privateChannelId: axiosResponse.data.privateChannelId,
      newsChannelId: axiosResponse.data.newsChannelId,
    };
  }

  async postGuild(request: PostGuildRequestDto): Promise<PostGuildResponseDto> {
    this.logger.log('attempting to call registration endpoint');

    const postGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/guilds/${request.guildId}`;
    const axiosResponse = await axios.post(postGuildsUrl, {
      guildName: request.guildName,
      poapManagerRoleId: request.poapManagerRoleId,
      privateChannelId: request.privateChannelId,
      newsChannelId: request.newsChannelId,
    } as PostGuildRequestDto);

    if (axiosResponse.status !== 201) {
      this.logger.verbose(axiosResponse);
      throw new Error(`status code: ${axiosResponse.status}`);
    }

    this.logger.log('successfully created guild');
    return { _id: axiosResponse.data._id };
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
