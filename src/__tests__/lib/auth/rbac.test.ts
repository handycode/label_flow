import { getPermissions, hasAllPermissions, hasAnyPermission, hasPermission } from '@/lib/auth/rbac'
import { Role } from '@/types'

describe('rbac helpers', () => {
  it('checks individual permissions', () => {
    expect(hasPermission(Role.ADMIN, 'user:create')).toBe(true)
    expect(hasPermission(Role.LABELER, 'user:create')).toBe(false)
  })

  it('checks any permission in a list', () => {
    expect(hasAnyPermission(Role.CHECKER, ['task:check', 'task:approve'])).toBe(true)
    expect(hasAnyPermission(Role.LABELER, ['user:read', 'statistics:all'])).toBe(false)
  })

  it('checks all permissions in a list', () => {
    expect(hasAllPermissions(Role.ADMIN, ['user:read', 'statistics:all'])).toBe(true)
    expect(hasAllPermissions(Role.CHECKER, ['task:check', 'task:approve', 'user:read'])).toBe(false)
  })

  it('returns the permissions for a role', () => {
    expect(getPermissions(Role.LABELER)).toEqual(
      expect.arrayContaining(['task:claim', 'task:submit', 'annotation:create'])
    )
    expect(getPermissions(Role.CHECKER)).not.toContain('package:create')
  })

  it('handles invalid role gracefully in hasPermission', () => {
    const invalidRole = 'INVALID_ROLE' as Role
    expect(hasPermission(invalidRole, 'user:read')).toBe(false)
  })

  it('handles invalid role gracefully in getPermissions', () => {
    const invalidRole = 'INVALID_ROLE' as Role
    expect(getPermissions(invalidRole)).toEqual([])
  })
})
