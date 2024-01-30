import { ProcessorRequestInterceptor } from './processor-request.interceptor';
import { describe, it, expect } from '@jest/globals';

describe('ProcessorRequestInterceptor', () => {
  it('should be defined', () => {
    expect(new ProcessorRequestInterceptor()).toBeDefined();
  });
});
