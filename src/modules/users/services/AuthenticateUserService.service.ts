import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../infra/typeorm/entities/User.entity';

@Injectable()
export class AuthenticateUserService {
  constructor(private readonly jwtService: JwtService) {}

  public async execute(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
