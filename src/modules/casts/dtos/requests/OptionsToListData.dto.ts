import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class OptionsList {
  @ApiPropertyOptional({
    example: 'Joe',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 10,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  take?: number;

  @ApiPropertyOptional({
    example: 0,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  skip?: number;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;
}
