import { ICreatePermissionsDTO } from '../dtos/ICreatePermissions.dto';
import { Permission } from '../infra/typeorm/entities/Permission.entity';

export interface IPermissionsRepository {
  create(data: ICreatePermissionsDTO): Promise<Permission>;
  findByName(name: string): Promise<Permission | undefined>;
}
