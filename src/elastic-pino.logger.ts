import { LoggerService } from '@nestjs/common';
import pino, { LoggerOptions } from 'pino';
import ecsFormat from '@elastic/ecs-pino-format';
import { Agent } from 'elastic-apm-node';
import { PinoLogger } from 'nestjs-pino';

export class ElasticPinoLogger extends PinoLogger implements LoggerService {
  constructor(private readonly apm?: Agent | null) {
    super({
      pinoHttp: { logger: ElasticPinoLogger.createPino() },
    });
    this.apm = apm;
  }

  static createPino(): pino.Logger {
    const { formatters, messageKey, timestamp } = ecsFormat();
    const targets: any = [
      {
        level: 'info', // all logs printed since info does not map
        target: 'pino/file',
        options: {
          destination: './logs/app.log',
          sync: false,
          mkdir: true,
        },
      },
      {
        level: 50,
        target: 'pino/file',
        options: {
          destination: './logs/error.log',
          sync: false,
          mkdir: true,
        },
      },
    ];
    if (process.env.NODE_ENV !== 'production') {
      // https://github.com/pinojs/pino-pretty
      targets.push({
        target: 'pino-pretty',
        options: {
          timestampKey: '@timestamp',
          messageKey: 'message',
          ignore: 'pid,hostname,0',
        },
      });
    }
    return pino({
      name: 'badge-buddy-api',
      level: 'info',
      timestamp: timestamp,
      messageKey: messageKey,
      formatters: {
        ...formatters?.log,
        ...formatters?.bindings,
      },
      transport: {
        targets: targets,
      },
    } as LoggerOptions);
  }

  // LoggerService
  log(message: any, ...optionalParams: any[]): any {
    this.info({ ...optionalParams }, message);
  }

  error(message: any, ...optionalParams: any[]): any {
    super.error({ ...optionalParams }, message);
  }

  // PinoLogger
  info(mergingObj: unknown, msg?: string, ...args: any[]): void {
    if (this.apm?.currentTransaction) {
      super.info({
        transactionId: this.apm.currentTraceIds['transaction.id'],
        traceId: this.apm.currentTraceIds['trace.id'],
        spanId: this.apm.currentTraceIds['span.id'],
        message: msg,
        ...(mergingObj as object),
      });
      return;
    }
    super.info(mergingObj, msg, ...args);
  }
}
