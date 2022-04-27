import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import configuration from '../config/configuration';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [PublisherService],
  controllers: [PublisherController],
})
export class PublisherModule {}
