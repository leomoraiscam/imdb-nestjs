import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

type EnumTypes = 'Role' | 'User';

export class CreateRolesDTO {
  @ApiProperty()
  @IsIn(['ADMIN', 'USER'])
  @IsNotEmpty()
  name: EnumTypes;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
