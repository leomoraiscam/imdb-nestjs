import { PermissionsEnum } from '@/modules/accessControlList/dtos/permissions.enum';
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permissions';

export const HasPermissions = (...permissions: PermissionsEnum[]) => {
  return SetMetadata(PERMISSION_KEY, permissions);
};
