import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

type EnumTypes = 'admin' | 'user';

export class CreateRolesDTO {
  @ApiProperty()
  @IsIn(['admin', 'user'])
  @IsNotEmpty()
  name: EnumTypes;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
