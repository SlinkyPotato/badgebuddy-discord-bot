import { ENV_BADGEBUDDY_API_HOST } from '@/app.constants';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InternalAxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { DiscordBotTokenDto } from '@badgebuddy/common';

@Injectable()
export class AuthRequestInterceptor {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  intercept(
    config: InternalAxiosRequestConfig<{
      organizerSId: string;
    }>,
  ) {
    const url = config.url;
    const bbBaseUrl = this.configService.get<string>(ENV_BADGEBUDDY_API_HOST);

    if (!url || !url.startsWith(`${bbBaseUrl}`)) {
      this.logger.verbose('skip intercepting request');
      return config;
    }

    if (!config.headers) {
      return config;
    }

    const discordUserSId = config?.data!.organizerSId;
    const authToken = this.generateToken(discordUserSId);

    config.headers.Authorization = `Bearer ${authToken}`;
    this.logger.verbose(`intercepted request: ${url}`);
    return config;
  }

  generateToken(discordUserSId: string) {
    return this.jwtService.sign({
      sessionId: crypto.randomUUID().toString(),
      discordUserSId,
    } as DiscordBotTokenDto);
  }
}
