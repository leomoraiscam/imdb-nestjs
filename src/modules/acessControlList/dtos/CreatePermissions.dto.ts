import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionsDTO {
  @ApiProperty({
    example: 'permission',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'this permission to create data',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
