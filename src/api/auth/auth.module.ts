import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRequestInterceptor } from './auth-request.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResponseInterceptor } from './auth-response.interceptor';
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
    AuthService,
    AuthRequestInterceptor,
    AuthResponseInterceptor,
  ],
  exports: [AuthService, AuthRequestInterceptor, AuthResponseInterceptor],
})
export class AuthModule {}
