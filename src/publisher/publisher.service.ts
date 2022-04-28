import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSub } from '@google-cloud/pubsub';
import { LoggerService } from '../logger/logger.service';
import { AlbumDTO } from './dto/album.dto';
import { uuid as v4 } from 'uuidv4';

@Injectable()
export class PublisherService {
  private client: PubSub;
  private topic: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    const buffer = Buffer.from(
      process.env.GCLOUD_PUBSUB_SUBSCRIBER_B64,
      'base64',
    );

    const credentialDecoded = buffer ? buffer.toString() : null;
    const credentialJson = JSON.parse(credentialDecoded);

    this.client = new PubSub({
      projectId: process.env.GCLOUD_PROJECT_ID,
      credentials: credentialJson,
    });

    this.topic = process.env.GCLOUD_PUBSUB_TOPIC_ID;
  }

  generateAttributes = (album: AlbumDTO) => {
    return {
      eventId: v4(),
      eventType: album.eventType,
      entityId: album.productDetail.sku,
      entityType: 'musicAlbum',
      timestamp: '',
      datetime: `2019-12-04`,
      version: '1.0',
      country: 'CL/MX/AR',
      commerce: 'FALABELLA',
      channel: 'WEB',
      domain: 'XINTEC',
      capability: 'XINTEC',
      mimeType: 'application/json',
    };
  };

  publishMessage = async (album: AlbumDTO): Promise<AlbumDTO> => {
    const attributes = this.generateAttributes(album);

    delete album.eventType;
    const albumToString = JSON.stringify(album);
    const data = Buffer.from(albumToString);

    try {
      const messageId = await this.client
        .topic(this.topic)
        .publishMessage({ data, attributes });
      this.loggerService.info('Message published' + messageId);
    } catch (error) {
      this.loggerService.error(
        'Received error while publishing: ',
        error.message,
      );
      throw new BadRequestException();
    }
    return album;
  };
}
