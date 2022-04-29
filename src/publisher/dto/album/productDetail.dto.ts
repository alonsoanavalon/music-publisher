import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PrincipalBarcodeDTO } from './principalBarcode.dto';

export class ProductDetailsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sku: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productDescription: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PrincipalBarcodeDTO)
  readonly principalBarcode: PrincipalBarcodeDTO;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  discountPercentage: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  stockOnlineAvailable: boolean;
}
