import { Role } from '@/types'

// 权限定义
export type Permission =
  | 'user:read'
  | 'user:create'
  | 'user:update'
  | 'user:delete'
  | 'package:read'
  | 'package:create'
  | 'package:update'
  | 'package:delete'
  | 'package:distribute'
  | 'task:read'
  | 'task:claim'
  | 'task:label'
  | 'task:submit'
  | 'task:check'
  | 'task:approve'
  | 'task:reject'
  | 'annotation:read'
  | 'annotation:create'
  | 'annotation:update'
  | 'annotation:delete'
  | 'statistics:read'
  | 'statistics:all';

// 角色权限映射
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    'user:read',
    'user:create',
    'user:update',
    'user:delete',
    'package:read',
    'package:create',
    'package:update',
    'package:delete',
    'package:distribute',
    'task:read',
    'statistics:read',
    'statistics:all',
  ],
  [Role.LABELER]: [
    'task:read',
    'task:claim',
    'task:label',
    'task:submit',
    'annotation:read',
    'annotation:create',
    'annotation:update',
    'annotation:delete',
    'statistics:read',
  ],
  [Role.CHECKER]: [
    'task:read',
    'task:check',
    'task:approve',
    'task:reject',
    'annotation:read',
    'statistics:read',
  ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}

export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? []
}
