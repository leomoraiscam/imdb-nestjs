import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { User } from '../infra/typeorm/entities/User.entity';

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findRolesUserById(id: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
