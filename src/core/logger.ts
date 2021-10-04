import { Logger } from '@nestjs/common';
const { createLogger, format, transports } = require('winston');
const {
  combine,
  simple,
  metadata,
  timestamp,
  ms,
  printf
} = format;
require('winston-daily-rotate-file');
const { SPLAT } = require('triple-beam');

const logger = createLogger({
  transports: [
    new transports.DailyRotateFile({
      filename: './logs/logs-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '2m',
      maxFiles: '5d',
      handleException: false,
      format: combine(
        simple(),
        metadata(),
        timestamp({
          format: 'DD.MM.YYYY HH:mm:ss'
        }),
        ms(),
        printf(({ timestamp, ms, level, message, ...metadata }) => {
          const context = `${metadata[SPLAT] || 'CORE'}`
          try { Logger[level](message, context) } catch(e) { Logger.log(message, context) }
          return `${timestamp} ${ms} ${level.toUpperCase()} [${context}] ${message}`
        })
      )
    })
  ]
});

export default logger