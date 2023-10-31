import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessorService {
  getHello(): string {
    return 'Hello World!';
  }
}
