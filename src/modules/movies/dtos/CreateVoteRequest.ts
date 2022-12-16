import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

type EnumTypes = 1 | 2 | 3 | 4;

export class CreateVoteRequestDTO {
  @ApiProperty()
  @IsIn([1, 2, 3, 4])
  @IsNotEmpty()
  note: EnumTypes;
}
