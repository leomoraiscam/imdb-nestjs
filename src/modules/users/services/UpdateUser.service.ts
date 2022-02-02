import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateUserDTO } from '../dtos/UpdateUser.dto';
import { User } from '../infra/typeorm/entities/User.entity';
import { UsersRepository } from '../infra/typeorm/repositories/Users.repository';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BCryptHash.provider';

@Injectable()
export class UpdateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly hashProvider: BCryptHashProvider,
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
      throw new BadRequestException('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new BadRequestException('Email already in use');
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
