import { describe, it, expect, jest } from '@jest/globals';
import bootstrap from './bootstrap';
import {
  CommonPinoLogger,
  CommonPinoLoggerService,
} from '@solidchain/badge-buddy-common';
import { NestFactory } from '@nestjs/core';

jest.mock('@solidchain/badge-buddy-common', () => {
  const actual = jest.requireActual('@solidchain/badge-buddy-common') as object;

  return {
    __esModule: true,
    ...actual,
    CommonPinoLogger: jest.fn().mockImplementation(() => ({
      logger: jest.fn().mockReturnThis(),
    })),
    CommonPinoLoggerService: jest.fn().mockReturnThis(),
  };
});

jest.mock('@nestjs/core', () => {
  const actual = jest.requireActual('@nestjs/core') as object;

  return {
    __esModule: true,
    ...actual,
    NestFactory: {
      createApplicationContext: jest.fn().mockImplementation(() => ({})),
    },
  };
});

describe('Bootstrap', () => {
  it('should be defined', () => {
    expect(bootstrap).toBeDefined();
  });

  it('should call app configuration', async () => {
    await bootstrap();
    expect(true).toBeTruthy();
    expect(CommonPinoLogger).toHaveBeenCalledTimes(1);
    expect(CommonPinoLoggerService).toHaveBeenCalledTimes(1);
    expect(NestFactory.createApplicationContext).toHaveBeenCalledTimes(1);
  });
});
