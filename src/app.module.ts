import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PublisherModule } from './publisher/publisher.module';
import { HeadersModule } from './headers/headers.module';
@Module({
  imports: [
    PublisherModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HeadersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
