import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { LoggerModule } from '../logger/logger.module';
import { HeadersDTO } from './headers.request';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [HeadersDTO],
})
export class HeadersModule {}
