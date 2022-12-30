import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateACLToUserDTO {
  @ApiProperty({
    example: ['3f6647c5-2ce7-4908-b8c5-b421990dfae8'],
  })
  @IsOptional()
  userId?: string;

  @ApiProperty({
    example: ['9eeedc0d-e903-4ea3-98e1-0938cd50e540'],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  permissions: string[];

  @ApiProperty({
    example: ['ff5985d0-f9bf-489b-8fba-302651ee229c'],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  roles: string[];
}
