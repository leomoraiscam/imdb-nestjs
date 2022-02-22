import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository.interface';

import { jwt } from '../../../../../config/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: IUsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepository.findRolesUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('invalid-token');
    }

    return user;
  }
}
