import { RolesEnum } from '@/modules/accessControlList/dtos/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateRolesDTO {
  @ApiProperty({
    example: 'admin',
  })
  @IsIn([RolesEnum.ADMIN, RolesEnum.USER])
  @IsNotEmpty()
  name: RolesEnum;

  @ApiProperty({
    example: 'this role is the administrator',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
