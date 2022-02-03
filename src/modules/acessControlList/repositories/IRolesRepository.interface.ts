import { ICreatePermissionsDTO } from '../dtos/ICreatePermissions.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';

interface IRolesRepository {
  findById(id: string): Promise<Role | undefined>;
  findByIds(ids: string[]): Promise<Role[]>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreatePermissionsDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
}

export default IRolesRepository;
