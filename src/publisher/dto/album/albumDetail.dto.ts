import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AlbumDetailsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  artist: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  album: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  year: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  format: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  genres: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  tracklist: string[];
}
