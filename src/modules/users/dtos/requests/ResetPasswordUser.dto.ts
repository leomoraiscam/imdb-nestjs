import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResetPasswordUserDTO {
  @IsString()
  @IsOptional()
  token?: string;

  @ApiProperty({
    example: 'pass@1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
