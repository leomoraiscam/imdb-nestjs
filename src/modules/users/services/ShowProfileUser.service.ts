import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../infra/typeorm/entities/User.entity';
import { IUsersRepository } from '../repositories/UsersRepository.interface';

@Injectable()
export class ShowProfileUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
