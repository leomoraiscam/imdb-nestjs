import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { LocalAuthGuard } from 'src/shared/infra/http/guards/localAuth.guard';

import { AuthenticateUserService } from '../../../services/AuthenticateUser.service';
import { User } from '../../typeorm/entities/User.entity';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  public async create(@Request() req: any) {
    const user = req.user as User;

    const authenticateUser = this.authenticateUserService.execute(user);

    return classToClass(authenticateUser);
  }
}
