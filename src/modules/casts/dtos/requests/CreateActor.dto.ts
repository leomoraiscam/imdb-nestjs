import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDTO {
  @ApiProperty({
    example: 'John Doe',
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
