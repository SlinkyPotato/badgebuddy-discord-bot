import { Logger, Module } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRequestInterceptor } from './interceptors/auth-request/auth-request.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResponseInterceptor } from './interceptors/auth-response/auth-response.interceptor';
import {
  ENV_AUTH_DISCORD_BOT_CLIENT_ID,
  ENV_AUTH_DISCORD_BOT_CLIENT_SECRET,
} from '@/app.constants';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_AUTH_DISCORD_BOT_CLIENT_SECRET),
        signOptions: {
          expiresIn: '4s',
          issuer: configService.get<string>(ENV_AUTH_DISCORD_BOT_CLIENT_ID),
          subject: configService.get<string>(ENV_AUTH_DISCORD_BOT_CLIENT_ID),
        },
      }),
    }),
  ],
  providers: [
    Logger,
    AuthApiService,
    AuthRequestInterceptor,
    AuthResponseInterceptor,
  ],
  exports: [AuthApiService, AuthRequestInterceptor, AuthResponseInterceptor],
})
export class AuthApiModule {}
