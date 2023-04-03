import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendForgotPasswordDTO {
  @ApiProperty({
    example: 'email@email.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
}
