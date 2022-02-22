import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '../utils/role.enum';

export const ROLES_KEY = 'roles';

export const HasRoles = (...roles: RoleEnum[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
