import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AlbumDetailsDTO } from './albumDetail.dto';
import { ProductDetailsDTO } from './productDetail.dto';

export class AlbumDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventType: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AlbumDetailsDTO)
  readonly albumDetails: AlbumDetailsDTO;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ProductDetailsDTO)
  readonly productDetail: ProductDetailsDTO;
}
