import { Controller, Body, Post, Get } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumDTO } from './dto/album.dto';
import { PublisherService } from './publisher.service';

@Controller('publisher')
@ApiTags('publisher')
export class PublisherController {
  constructor(
    private readonly publisherService: PublisherService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The album is saved',
    type: AlbumDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'The body of album is not a AlbumDTO object',
  })
  @Post()
  create(@Body() album: AlbumDTO): string {
    return 'Llegó con exito el album\n' + album;
  }
  @Get()
  testPubSub(): any {
    return this.publisherService.publishMessage();
  }
}
