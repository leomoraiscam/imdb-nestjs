import { USERS_REPOSITORY } from '@/config/constants/repositories.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../infra/typeorm/entities/User.entity';
import { IUsersRepository } from '../repositories/UsersRepository.interface';

@Injectable()
export class ShowProfileUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
