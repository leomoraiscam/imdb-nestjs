import { jwt } from '@/config/auth';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { AuthenticateUserDTO } from '../dtos/requests/AuthenticateUser.dto';
import { AuthenticatedUserDTO } from '../dtos/responses/AuthenticatedUser.dto';
import { IHashProvider } from '../providers/hashProvider/models/HashProvider.interface';
import { IUsersRepository } from '../repositories/UsersRepository.interface';

@Injectable()
export class AuthenticateUserService {
  constructor(
    @Inject('HASH_PROVIDER')
    private readonly hashProvider: IHashProvider,
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<AuthenticatedUserDTO> {
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

    return { user, token };
  }
}
