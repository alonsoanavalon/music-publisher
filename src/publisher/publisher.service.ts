import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSub } from '@google-cloud/pubsub';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PublisherService {
  private client: PubSub;
  private topic: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.topic = process.env.GCLOUD_PUBSUB_TOPIC_ID;

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
  }

  publishMessage = async () => {
    const data = Buffer.from('hello world');

    try {
      const messageId = await this.client
        .topic(this.topic)
        .publishMessage({ data });
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  };
}
