import { ENV_BADGE_BUDDY_API_HOST } from '@/app.constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { InternalAxiosRequestConfig } from 'axios';

@Injectable()
export class AuthRequestInterceptor {

  constructor(
    private readonly configService: ConfigService,
    private authService: AuthService,
  ) {}

  intercept(config: InternalAxiosRequestConfig<any>) {
    const url = config.baseURL;

    const bbBaseUrl = this.configService.get<string>(ENV_BADGE_BUDDY_API_HOST);

    if (!url || !url.startsWith(`${bbBaseUrl}`)) {
      return config;
    }

    if (!config.headers) {
      return config;
    }
    
    const discordUserSId = config.data.organizerSId;
    const authToken = this.authService.generateToken(discordUserSId);

    config.headers['Authorization'] = `Bearer ${authToken}`;
    return config;
  }
}
