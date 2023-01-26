import { CommonOptionsDTO } from '@/shared/dtos/Options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListGenresDTO extends CommonOptionsDTO {
  @ApiPropertyOptional({
    example: 'Action',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
