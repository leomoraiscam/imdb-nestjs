import { RolesEnum } from '@/modules/accessControlList/dtos/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const HasRoles = (...roles: RolesEnum[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
