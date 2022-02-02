import { AbstractRepository, EntityRepository } from 'typeorm';

import { CreateUserDTO } from '../../../dtos/CreateUser.dto';
import IUsersRepository from '../../../repositories/IUsersRepository.interface';
import { User } from '../entities/User.entity';

@EntityRepository(User)
export class UsersRepository
  extends AbstractRepository<User>
  implements IUsersRepository
{
  public async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
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
