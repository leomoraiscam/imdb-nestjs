import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDTO } from '../../../dtos/CreateUserDTO';
import { CreateUserService } from '../../../services/CreateUserService.service';
import { User } from '../../typeorm/entities/User.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.createUserService.execute(createUserDto);
  }
}
