import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenresDTO {
  @ApiProperty({
    example: 'adventure',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'this all movies of adventure',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
