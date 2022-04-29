import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AttributesDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  eventType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  entityId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  entityType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  timestamp: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  datetime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  version: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  commerce: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  channel: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  domain: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  capability: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  mimeType: string;
}
