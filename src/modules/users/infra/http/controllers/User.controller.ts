import { Body, Controller, Post } from '@nestjs/common';
import { classToClass } from 'class-transformer';

import { CreateUserDTO } from '../../../dtos/CreateUser.dto';
import { CreateUserService } from '../../../services/CreateUser.service';
import { User } from '../../typeorm/entities/User.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.createUserService.execute(createUserDTO);

    return classToClass(user);
  }
}
