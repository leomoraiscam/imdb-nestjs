import { CreateUsersDTO } from '../dtos/requests/CreateUsers.dto';
import { User } from '../infra/typeorm/entities/User.entity';

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findRolesUserById(id: string): Promise<User | undefined>;
  create(data: CreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
