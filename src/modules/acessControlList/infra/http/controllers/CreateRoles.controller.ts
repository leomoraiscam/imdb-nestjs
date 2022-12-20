import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { CreateRolesDTO } from '../../../dtos/http/requests/CreateRoles.dto';
import { CreateRoleService } from '../../../services/CreateRole.service';
import { Role } from '../../typeorm/entities/Role.entity';

@ApiTags('Access Control List')
@Controller('roles')
export class CreateRolesController {
  constructor(private readonly createRoleService: CreateRoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Role,
    description: 'This will be returned when the created role',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when the email is already in use',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  handle(@Body() { name, description }: CreateRolesDTO): Promise<Role> {
    return this.createRoleService.execute({
      name,
      description,
    });
  }
}
