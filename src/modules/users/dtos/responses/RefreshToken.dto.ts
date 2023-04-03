import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAyNjQwMzEsImV4cCI6MTY3MDM1MDQzMSwic3ViIjoiM2M5YjNjYzMtYjM3ZS00NjA2LTg0NDUtYThkOTA5NWZhMjM3In0.8cQldqJ63wLVhwNSxW2xV-Hq90wSlktD0_d5AzBbTuM',
  })
  @IsString()
  @IsNotEmpty()
  public refreshToken: string;
}
