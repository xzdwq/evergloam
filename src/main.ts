import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import logger from '@src/core/logger'
var process = require('process'); 

import { AppModule } from './app.module';

async function run() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  })
  const config = app.get(ConfigService),
        http_log = JSON.parse(config.get('http_log'))

  app.setGlobalPrefix('api')
  app.enableCors()

  app.use(morgan('combined', {
    stream: {
      write: (message: string) => { http_log ? logger.info(message) : null  }
    }
  }))

  const PORT = config.get('port')
  await app.listen(
    PORT,
    '0.0.0.0',
    async () => logger.info(`Server running on port ${PORT}. Application on url ${await app.getUrl()}. Process ID: ${process.pid}`, 'NestApp')
  )
}
run();
