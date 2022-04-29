import { Controller, Body, Post, Get } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumDTO } from './dto/album/album.dto';
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
    description: 'The albums body is not an AlbumDTO object',
  })
  @Post()
  create(@Body() album: AlbumDTO): Promise<AlbumDTO> {
    this.loggerService.info('Message saved successfully');
    return this.publisherService.publishMessage(album);
  }
}
