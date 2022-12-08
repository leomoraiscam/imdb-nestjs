import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

type EnumTypes = 'admin' | 'user';

export class CreateRolesDTO {
  @ApiProperty({
    example: 'admin',
  })
  @IsIn(['admin', 'user'])
  @IsNotEmpty()
  name: EnumTypes;

  @ApiProperty({
    example: 'this role is the administrator',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
