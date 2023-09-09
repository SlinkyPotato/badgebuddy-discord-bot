import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Guild, NewsChannel, Role, TextChannel } from 'discord.js';
import CommandException from '../../commands/_exceptions/command.exception';
import { ConfigService } from '@nestjs/config';
import { GetGuildResponseDto } from './dto/get-guild.response.dto';
import { PostGuildRequestDto } from './dto/post-guild.request.dto';

@Injectable()
export class GuildsApiService {
  private readonly logger: Logger = new Logger(GuildsApiService.name);

  constructor(private configService: ConfigService) {}

  async getGuild(guildId: string): Promise<GetGuildResponseDto> {
    this.logger.log(`attempting to get guildId: ${guildId}`);

    const getGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/guilds/guildId`;

    const response: GetGuildResponseDto = new GetGuildResponseDto();
    let axiosResponse;

    try {
      axiosResponse = await axios.get(getGuildsUrl);

      if (axiosResponse.status !== 200) {
        throw new Error('failed to get guild');
      }
    } catch (error) {
      this.logger.error(
        `failed to get registered guild for guildId: ${guildId}`,
        error,
      );

      throw new CommandException('Please try again.');
    }

    response._id = axiosResponse.data._id;
    response.guildId = axiosResponse.data.guildId;
    response.guildName = axiosResponse.data.guildName;
    response.poapManagerRoleId = axiosResponse.data.roleId;
    response.privateChannelId = axiosResponse.data.channelId;
    response.newsChannelId = axiosResponse.data.newsChannelId;

    this.logger.log(`successfully got guildId: ${guildId}`);
    return response;
  }

  async postGuild(
    guild: Guild,
    role: Role,
    channel: TextChannel,
    newsChannel: NewsChannel | null,
  ) {
    this.logger.log('attempting to call registration endpoint');

    const postGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/guilds${guild.id}`;
    let response = { data: null, status: null };

    try {
      response = await axios.post(postGuildsUrl, {
        guildId: guild.id.toString(),
        guildName: guild.name.toString(),
        poapManagerRoleId: role.id.toString(),
        privateChannelId: channel.id.toString(),
        newsChannelId: newsChannel?.id.toString(),
      } as PostGuildRequestDto);

      if (response.status !== 201) {
        throw new Error('failed to register guild');
      }
    } catch (error) {
      this.logger.error(`failed to register guildId: ${guild.id}`, error);
    }

    this.logger.log('successfully registered guild');
    return response.data;
  }

  async deleteGuild(guildId: string): Promise<void> {
    this.logger.log(`removing guildId: ${guildId}`);
    const deleteGuildsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/guilds/${guildId}`;
    try {
      const response = await axios.delete(deleteGuildsUrl);
      if (response.status !== 204) {
        throw new Error(`status code not 201: ${guildId}`);
      }
    } catch (e) {
      this.logger.error(
        `error removing guildId: ${guildId}, error: ${e.message}`,
        e,
      );
    }
  }
}
