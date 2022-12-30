import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMoviesDTO {
  @ApiProperty({
    example: 'Transformers',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'The robots movie',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: 2018,
  })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: '1h:20',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    example: [
      '823423d6-a1a8-4751-8ed9-73cb462ba9ee',
      '93fa1718-f8c0-48d4-9361-00676730dc7f',
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  genreIds: string[];
}
