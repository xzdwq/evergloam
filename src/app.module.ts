import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@cfg/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`
      ],
      load: [
        configuration
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
