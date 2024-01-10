import { EndEventSlashDto } from './end-event-slash.dto';
import { describe, it, expect } from '@jest/globals';

describe('EndEventSlashDto', () => {
  it('should be defined', () => {
    expect(new EndEventSlashDto()).toBeDefined();
  });
});
