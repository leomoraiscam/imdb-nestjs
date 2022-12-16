import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateUserDTO } from '../dtos/UpdateUser.dto';
import { User } from '../infra/typeorm/entities/User.entity';
import { IHashProvider } from '../providers/hashProvider/models/HashProvider.interface';
import { IUsersRepository } from '../repositories/UsersRepository.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('HASH_PROVIDER')
    private readonly hashProvider: IHashProvider,
    @Inject('USER_REPOSITORY')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new ConflictException('Email already in use');
    }

    Object.assign(user, { name, email });

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
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
