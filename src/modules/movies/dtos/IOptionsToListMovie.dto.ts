import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class OptionsList {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  genre_id?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  take?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  skip?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  page?: number;
}
