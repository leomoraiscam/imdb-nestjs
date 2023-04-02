import { jwt } from '@/config/constants/auth.constants';
import { USERS_TOKENS_REPOSITORY } from '@/config/constants/repositories.constants';
import { IUsersTokensRepository } from '@/modules/users/repositories/UsersTokensRepository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USERS_TOKENS_REPOSITORY)
    private readonly usersTokensRepository: IUsersTokensRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secretRefreshToken,
    });
  }

  async validate(payload: any) {
    const user = await this.usersTokensRepository.findByUserId(payload.sub);

    if (!user) {
      throw new UnauthorizedException('tokenInvalid');
    }

    return user;
  }
}
