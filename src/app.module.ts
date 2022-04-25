import { Module } from '@nestjs/common';
import { PublisherModule } from './publisher/publisher.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PublisherModule, LoggerModule],
})
export class AppModule {}
