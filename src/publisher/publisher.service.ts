import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSub } from '@google-cloud/pubsub';
import { LoggerService } from '../logger/logger.service';
import { AlbumDTO } from './dto/album/album.dto';
import { uuid as v4 } from 'uuidv4';

import { AttributesDTO } from './dto/attributes.dto';
import * as moment from 'moment';
import 'moment-timezone';
import { HeadersDTO } from '../headers/headers.request';

@Injectable()
export class PublisherService {
  private client: PubSub;
  private topic: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    const buffer: Buffer = Buffer.from(
      this.configService.get<string>('pubsub.subscriberB64'),
      'base64',
    );

    const credentialDecoded: string = buffer ? buffer.toString() : null;
    const credentialJson: any = JSON.parse(credentialDecoded);

    this.client = new PubSub({
      projectId: configService.get<string>('pubsub.projectId'),
      credentials: credentialJson,
    });

    this.topic = configService.get<string>('pubsub.topicId');
  }

  parseAttributes = (attributes: object) => {
    return JSON.parse(JSON.stringify(attributes));
  };

  generateAttributes = (album: AlbumDTO) => {
    const generatedAttributes: AttributesDTO = {
      eventId: v4(),
      eventType: album.eventType,
      entityId: album.productDetail.sku,
      entityType: 'musicAlbum',
      timestamp: `${moment().unix().toString()}`,
      datetime: `${moment()
        .tz('America/Santiago')
        .toISOString(true)
        .substring(0, 23)}Z`,
      version: '1.0',
      country: this.configService.get('headers.countries'),
      commerce: `${this.configService.get('headers.x_commerce')}`,
      channel: `${this.configService.get('headers.x_chref')}`,
      domain: `${this.configService.get('headers.atrib_domain')}`,
      capability: `${this.configService.get('headers.x_capability')}`,
      mimeType: 'application/json',
    };

    return this.parseAttributes(generatedAttributes);
  };

  publishMessage = async (
    album: AlbumDTO,
    headers: HeadersDTO,
  ): Promise<AlbumDTO> => {
    const attributes: { [k: string]: string } = this.generateAttributes(album);
    delete album.eventType;
    const albumToString = JSON.stringify(album);
    const data = Buffer.from(albumToString);

    try {
      const messageId = await this.client
        .topic(this.topic)
        .publishMessage({ data, attributes });
      this.loggerService.info(headers, `Message published ${messageId}`);
    } catch (error) {
      this.loggerService.error(
        headers,
        `Received error while publishing: ${error.message} `,
      );
      throw new BadRequestException();
    }
    return album;
  };
}
