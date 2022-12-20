import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateACLToUserDTO {
  @ApiProperty({
    example: ['9eeedc0d-e903-4ea3-98e1-0938cd50e540'],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  permissions: string[];

  @ApiProperty({
    example: ['ff5985d0-f9bf-489b-8fba-302651ee229c'],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  roles: string[];
}
