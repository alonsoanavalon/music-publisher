import { Controller, Body, Post, Get } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumDTO } from './dto/album/album.dto';
import { PublisherService } from './publisher.service';
import { RequestHeader } from 'src/decorators/headers/request-header.decorator';
import { HeadersDTO } from '../headers/headers.request';

@ApiTags('publisher')
@Controller('publisher')
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
    description: "The album's body is not an AlbumDTO object",
  })
  @Post()
  create(
    @Body() album: AlbumDTO,
    @RequestHeader(HeadersDTO) headers: HeadersDTO,
  ): Promise<AlbumDTO> {
    this.loggerService.info(headers, 'Message saved successfully');
    return this.publisherService.publishMessage(album, headers);
  }
}
