import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { User } from '../infra/typeorm/entities/User.entity';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BCryptHash.provider';
import IUsersRepository from '../repositories/IUsersRepository.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: IUsersRepository,
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
