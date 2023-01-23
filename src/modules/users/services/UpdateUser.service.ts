import { HASH_PROVIDER } from '@/config/constants/providers.constants';
import { USERS_REPOSITORY } from '@/config/constants/repositories.constants';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateUserDTO } from '../dtos/requests/UpdateUser.dto';
import { User } from '../infra/typeorm/entities/User.entity';
import { IHashProvider } from '../providers/hashProvider/models/HashProvider.interface';
import { IUsersRepository } from '../repositories/UsersRepository.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(HASH_PROVIDER)
    private readonly hashProvider: IHashProvider,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new ConflictException('Email already in use');
    }

    Object.assign(user, { name, email });

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new BadRequestException('Old Password does not match');
      }

      const newPasswordHash = await this.hashProvider.generateHash(password);

      Object.assign(user, { password: newPasswordHash });
    }

    return this.usersRepository.save(user);
  }
}
