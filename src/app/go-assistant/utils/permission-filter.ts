import type { AssistantPermissionKey } from '../models/assistant.types';

export type PermissionChecker = (key: string) => boolean;

export function canAccessByPermissions(
  permissionsAny: AssistantPermissionKey[] | undefined,
  hasPermission: PermissionChecker,
  isPlatformAdmin: boolean,
): boolean {
  if (!permissionsAny || permissionsAny.length === 0) {
    return true;
  }
  if (permissionsAny.includes('platform_admin')) {
    return isPlatformAdmin;
  }
  return permissionsAny.some((p) => hasPermission(p));
}
