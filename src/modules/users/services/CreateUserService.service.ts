import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../infra/typeorm/entities/User.entity';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BCryptHashProvider.service';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly hashProvider: BCryptHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new BadRequestException('Email address already used');
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
