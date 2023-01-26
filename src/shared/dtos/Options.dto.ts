import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CommonOptionsDTO {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  perPage?: number;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @ApiProperty()
  @IsOptional()
  keyword?: string;

  @ApiProperty()
  @IsOptional()
  order?: 'ASC' | 'DESC' | 1 | -1;
}
