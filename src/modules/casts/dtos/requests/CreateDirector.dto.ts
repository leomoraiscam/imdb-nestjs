import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectorDTO {
  @ApiProperty({
    example: 'John Smith',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'M',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;
}
