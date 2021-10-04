import { Injectable } from '@nestjs/common';
import logger from '@src/core/logger'

@Injectable()
export class AppService {
  getHello(): string {
    logger.error('Hello World!', AppService.name)
    logger.warn('Hello World!', AppService.name)
    logger.info('Hello World!', AppService.name)
    return 'Hello World!';
  }
}
