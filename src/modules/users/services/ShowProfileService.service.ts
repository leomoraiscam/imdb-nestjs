import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../infra/typeorm/entities/User.entity';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
}

@Injectable()
export class ShowProfileService {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
