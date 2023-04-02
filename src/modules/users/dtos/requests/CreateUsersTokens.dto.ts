import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateUsersTokensDTO {
  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '',
  })
  @IsDate()
  @IsNotEmpty()
  expiresDate: Date;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
