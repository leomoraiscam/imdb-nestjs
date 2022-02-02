import { ICreatePermissionsDTO } from '../dtos/ICreatePermissions.dto';
import { Role } from '../infra/typeorm/entities/Role.entity';

interface IRolesRepository {
  create(data: ICreatePermissionsDTO): Promise<Role>;
  findByName(name: string): Promise<Role | undefined>;
}

export default IRolesRepository;
