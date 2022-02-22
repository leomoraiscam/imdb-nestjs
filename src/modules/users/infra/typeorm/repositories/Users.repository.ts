import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository.interface';
import { Repository } from 'typeorm';

import { CreateUserDTO } from '../../../dtos/CreateUser.dto';
import { User } from '../entities/User.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  public async findRolesUserById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id, {
      relations: ['roles'],
    });

    return user;
  }

  public async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({ email, password, name });

    await this.repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
