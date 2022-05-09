import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import 'dotenv/config';

const countries: string[] = JSON.parse(process.env.COUNTRIES);

export class HeadersDTO {
  @IsEnum(countries, {
    message: `Country is not valid [${countries.toString()}]`,
  })
  @IsNotEmpty()
  'x-country': string;

  @IsNotEmpty()
  @IsOptional()
  authorization?: string;

  @IsNotEmpty()
  @IsOptional()
  Authorization?: string;

  'x-commerce': string;
  'x-chref': string;
  'x-rhsref': string;
  'x-cmref': string;
  'x-txref': string;
  'x-prref': string;
  'x-usrtx': string;
}
