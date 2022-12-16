import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { User } from '../infra/typeorm/entities/User.entity';
import { IHashProvider } from '../providers/hashProvider/models/IHashProvider.interface';
import { IUsersRepository } from '../repositories/UsersRepository.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('HASH_PROVIDER')
    private readonly hashProvider: IHashProvider,
    @Inject('USER_REPOSITORY')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new ConflictException('Email address already used');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}
