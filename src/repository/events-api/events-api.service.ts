import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import GetRegistrationDto from './dto/get-registration.dto';
import { Guild, NewsChannel, Role, TextChannel } from 'discord.js';
import PostRegistrationDto from './dto/post-registration.dto';
import CommandException from '../../commands/_exceptions/command.exception';

@Injectable()
export class EventsApiService {
  private readonly logger: Logger = new Logger(EventsApiService.name);

  async getRegistration(guildId: string): Promise<GetRegistrationDto> {
    try {
      this.logger.log('attempting to call get registration endpoint');
      const response = await axios.get(
        `${process.env.BADGE_BUDDY_API_HOST}/registration/${guildId}`,
      );
      if (response.status !== 200) {
        throw new Error('failed to get registered guild');
      }
      this.logger.log('successfully get registered guild');
      return response.data as GetRegistrationDto;
    } catch (error) {
      this.logger.error(
        `failed to get registered guild for guildId: ${guildId}`,
        error,
      );
      throw new CommandException('Please try again.');
    }
  }

  async postRegistration(
    guild: Guild,
    role: Role,
    // category: CategoryChannel,
    channel: TextChannel,
    newsChannel: NewsChannel | null,
  ) {
    try {
      this.logger.log('attempting to call registration endpoint');
      const response = await axios.post(
        `${process.env.BADGE_BUDDY_API_HOST}/registration`,
        {
          guildId: guild.id.toString(),
          guildName: guild.name.toString(),
          roleId: role.id.toString(),
          channelId: channel.id.toString(),
          newsChannelId: newsChannel?.id.toString(),
        } as PostRegistrationDto,
      );
      if (response.status !== 201) {
        throw new Error('failed to register guild');
      }
      this.logger.log('successfully registered guild');
    } catch (error) {
      this.logger.error(`failed to register guildId: ${guild.id}`, error);
    }
  }

  async deleteRegistration(guildId: string): Promise<void> {
    this.logger.log(`unregistering guildId: ${guildId}`);
    try {
      const response = await axios.delete(
        `${process.env.BADGE_BUDDY_API_HOST}/registration/${guildId}`,
      );
      if (response.status !== 204) {
        throw new Error(`status code not 201: ${guildId}`);
      }
    } catch (e) {
      this.logger.error(
        `error unregistering guildId: ${guildId}, error: ${e.message}`,
        e,
      );
    }
  }
}
