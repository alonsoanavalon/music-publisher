import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions-filters/all-exception.filter';
import { LoggerService } from './logger/logger.service';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const loggerService = app.get<LoggerService>(LoggerService);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(loggerService, configService));

  await app.listen(3000);
}
bootstrap();
