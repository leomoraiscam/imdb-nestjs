import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from '../../../../../shared/infra/http/guards/LocalAuth.guard';
import { AuthenticateUserService } from '../../../services/AuthenticateUserService.service';
import { User } from '../../typeorm/entities/User.entity';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  public async create(@Request() req: any) {
    const user = req.user as User;

    return this.authenticateUserService.execute(user);
  }
}
