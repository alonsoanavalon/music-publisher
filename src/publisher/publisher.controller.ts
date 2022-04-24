import { Controller, Get } from '@nestjs/common';

@Controller('publisher')
export class PublisherController {
  @Get()
  sayHello(): string {
    return 'Hello world from publisher';
  }
}
