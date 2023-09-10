import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostEventsResponseDto } from './dto/post-events.response.dto';
import axios from 'axios';
import { PutEventsRequestDto } from './dto/put-events.request.dto';
import { PutEventsResponseDto } from './dto/put-events.response.dto';
import { GetActiveEventsQueryDto } from './dto/get-active-events.query.dto';
import { GetActiveEventsResponseDto } from './dto/get-active-events.response.dto';
import { PostEventsRequestDto } from './dto/post-events.request.dto';

@Injectable()
export class EventsApiService {
  constructor(private configService: ConfigService, private logger: Logger) {}

  async postEvent(
    request: PostEventsRequestDto,
  ): Promise<PostEventsResponseDto> {
    this.logger.log('attempting to call post events endpoint');
    const postEventsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/events`;
    const response = await axios.post(postEventsUrl, request);
    if (response.status !== 201) {
      this.logger.verbose(response);
      throw new Error(`status code: ${response.status}`);
    }
    this.logger.log(`successfully created event: ${response.data._id}`);
    return {
      _id: response.data._id,
      startDate: response.data.startDate,
      endDate: response.data.endDate,
    };
  }

  async putEvent(request: PutEventsRequestDto): Promise<PutEventsResponseDto> {
    this.logger.log('attempting to call put events endpoint');
    const putEventsUrl = `${this.configService.get(
      'BADGE_BUDDY_API_HOST',
    )}/events`;
    const response = await axios.put(putEventsUrl, request);
    if (response.status !== 200) {
      this.logger.verbose(response);
      throw new Error(`status code: ${response.status}`);
    }
    this.logger.log(`successfully stopped event: ${response.data._id}`);
    return {
      _id: response.data._id,
      isActive: response.data.isActive,
    };
  }
}
