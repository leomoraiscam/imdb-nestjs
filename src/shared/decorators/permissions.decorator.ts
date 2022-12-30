import { PermissionEnum } from '@/modules/accessControlList/dtos/permissions.enum';
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permissions';

export const HasPermissions = (...permissions: PermissionEnum[]) => {
  return SetMetadata(PERMISSION_KEY, permissions);
};
