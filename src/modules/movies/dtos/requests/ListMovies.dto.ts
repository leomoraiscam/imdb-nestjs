import { CommonOptionsDTO } from '@/shared/dtos/Options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListMoviesDTO extends CommonOptionsDTO {
  @ApiPropertyOptional({
    example: 'Transformers',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({
    example: [
      '37b75d18-d4cf-499a-9129-b71f2c4abc76, 5277dab0-1427-4460-9e8b-a5dc4c0de592',
    ],
  })
  @IsString()
  @IsOptional()
  genreIds?: string;
}
