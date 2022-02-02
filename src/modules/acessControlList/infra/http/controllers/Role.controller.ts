import { Body, Controller, Post } from '@nestjs/common';
import { classToClass } from 'class-transformer';

import { ICreateRolesDTO } from '../../../dtos/ICreateRoles.dto';
import { CreateRoleService } from '../../../services/CreateRole.service';
import { Role } from '../../typeorm/entities/Role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly createRoleService: CreateRoleService) {}

  @Post()
  async create(@Body() { name, description }: ICreateRolesDTO): Promise<Role> {
    const roles = this.createRoleService.execute({
      name,
      description,
    });

    return classToClass(roles);
  }
}
