import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { CreateRolesDTO as ICreateRolesDTO } from '../../../dtos/ICreateRoles.dto';
import { CreateRoleService } from '../../../services/CreateRole.service';
import { Role } from '../../typeorm/entities/Role.entity';

@ApiTags('Access Control List')
@Controller('roles')
export class RolesController {
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
  async create(@Body() { name, description }: ICreateRolesDTO): Promise<Role> {
    const roles = this.createRoleService.execute({
      name,
      description,
    });

    return classToClass(roles);
  }
}
