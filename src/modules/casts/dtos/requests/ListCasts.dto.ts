import { CommonOptionsDTO } from '@/shared/dtos/Options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListCastsDTO extends CommonOptionsDTO {
  @ApiPropertyOptional({
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
