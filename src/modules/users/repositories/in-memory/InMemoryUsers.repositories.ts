import { v4 as uuid } from 'uuid';

import { CreateUsersDTO } from '../../dtos/requests/CreateUsers.dto';
import { User } from '../../infra/typeorm/entities/User.entity';
import { IUsersRepository } from '../UsersRepository.interface';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async findRolesUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async create(userData: CreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }
}
