import { ENV_BADGE_BUDDY_API_HOST } from '@/app.constants';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {

  constructor(
    private readonly configService: ConfigService,
    private authService: AuthService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    const bbBaseUrl = this.configService.get<string>(ENV_BADGE_BUDDY_API_HOST);

    if (!url.startsWith(`${bbBaseUrl}`)) {
      return next.handle();
    }
    
    const discordUserSId = request.body.organizerSId;
    const authToken = this.authService.generateToken(discordUserSId);
    request.headers.authorization = `Bearer ${authToken}`;
    return next.handle();
  }
}
