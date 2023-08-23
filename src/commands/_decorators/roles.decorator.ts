import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: bigint[]) => SetMetadata(ROLES_KEY, roles);
