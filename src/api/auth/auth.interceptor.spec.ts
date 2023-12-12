import { AuthRequestInterceptor } from './auth-request.interceptor';

describe('AuthInterceptor', () => {
  it('should be defined', () => {
    expect(new AuthRequestInterceptor()).toBeDefined();
  });
});
