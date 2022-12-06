import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';

import { jwt } from '../../../config/auth';
import { AuthenticateUserRequestDTO } from '../dtos/AuthenticateUserRequest.dto';
import { IHashProvider } from '../providers/hashProvider/models/IHashProvider.interface';
import IUsersRepository from '../repositories/IUsersRepository.interface';

@Injectable()
export class AuthenticateUserService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('HASH_PROVIDER')
    private readonly hashProvider: IHashProvider,
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: AuthenticateUserRequestDTO) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('email/password incorrect');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('email/password incorrect');
    }

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    delete user.password;

    return { ...user, token };
  }
}
