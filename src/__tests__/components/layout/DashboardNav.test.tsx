import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import DashboardNav from '@/components/layout/DashboardNav'
import { usePathname, useRouter } from 'next/navigation'
import '@testing-library/jest-dom'
import { Role, SessionUser, UserStatus } from '@/types'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

describe('DashboardNav component', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    ;(usePathname as jest.Mock).mockReturnValue('/admin/packages')
    ;(global.fetch as jest.Mock).mockResolvedValue({ ok: true })
  })

  describe('ADMIN role', () => {
    const adminUser: SessionUser = {
      id: '1',
      username: 'admin_user',
      email: 'admin@test.com',
      role: 'ADMIN' as Role,
      status: 'ACTIVE' as UserStatus,
    }

    test('renders all admin navigation items', () => {
      render(<DashboardNav user={adminUser} />)

      expect(screen.getAllByText('任务包管理')[0]).toBeInTheDocument()
      expect(screen.getAllByText('媒体资源')[0]).toBeInTheDocument()
      expect(screen.getAllByText('用户管理')[0]).toBeInTheDocument()
    })

    test('displays admin badge', () => {
      render(<DashboardNav user={adminUser} />)

      expect(screen.getByText('管理员')).toBeInTheDocument()
    })

    test('highlights active route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/admin/packages')

      render(<DashboardNav user={adminUser} />)

      const activeLink = screen.getAllByText('任务包管理')[0].closest('a')
      expect(activeLink).toHaveClass('menu-active')
    })
  })

  describe('LABELER role', () => {
    const labelerUser: SessionUser = {
      id: '2',
      username: 'labeler_user',
      email: 'labeler@test.com',
      role: 'LABELER' as Role,
      status: 'ACTIVE' as UserStatus,
    }

    test('renders labeler navigation items', () => {
      render(<DashboardNav user={labelerUser} />)

      expect(screen.getAllByText('工作台')[0]).toBeInTheDocument()
      expect(screen.queryByText('任务包管理')).not.toBeInTheDocument()
    })

    test('displays labeler badge', () => {
      render(<DashboardNav user={labelerUser} />)

      expect(screen.getByText('标注员')).toBeInTheDocument()
    })
  })

  describe('CHECKER role', () => {
    const checkerUser: SessionUser = {
      id: '3',
      username: 'checker_user',
      email: 'checker@test.com',
      role: 'CHECKER' as Role,
      status: 'ACTIVE' as UserStatus,
    }

    test('renders checker navigation items', () => {
      render(<DashboardNav user={checkerUser} />)

      expect(screen.getAllByText('质检工作台')[0]).toBeInTheDocument()
      expect(screen.queryByText('任务包管理')).not.toBeInTheDocument()
    })

    test('displays checker badge', () => {
      render(<DashboardNav user={checkerUser} />)

      expect(screen.getByText('质检员')).toBeInTheDocument()
    })
  })

  describe('User interaction', () => {
    const adminUser: SessionUser = {
      id: '1',
      username: 'admin_user',
      email: 'admin@test.com',
      role: 'ADMIN' as Role,
      status: 'ACTIVE' as UserStatus,
    }

    test('displays username', () => {
      render(<DashboardNav user={adminUser} />)

      expect(screen.getByText('admin_user')).toBeInTheDocument()
    })

    test('logout button calls logout API and redirects', async () => {
      render(<DashboardNav user={adminUser} />)

      // Click on user dropdown to reveal logout button
      const userButton = screen.getByRole('button', { name: /管理员/i })
      fireEvent.click(userButton)

      // Click logout
      const logoutButton = screen.getByText('退出登录')
      fireEvent.click(logoutButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/logout', { method: 'POST' })
        expect(mockPush).toHaveBeenCalledWith('/login')
      })
    })

    test('renders brand link', () => {
      render(<DashboardNav user={adminUser} />)

      const brandLink = screen.getByText('Label Flow')
      expect(brandLink).toBeInTheDocument()
      expect(brandLink.closest('a')).toHaveAttribute('href', '/')
    })
  })

  describe('Navigation structure', () => {
    const adminUser: SessionUser = {
      id: '1',
      username: 'admin_user',
      email: 'admin@test.com',
      role: 'ADMIN' as Role,
      status: 'ACTIVE' as UserStatus,
    }

    test('has navbar structure', () => {
      const { container } = render(<DashboardNav user={adminUser} />)

      const navbar = container.querySelector('.navbar')
      expect(navbar).toBeInTheDocument()
      expect(navbar).toHaveClass('bg-base-100', 'shadow-lg')
    })

    test('has mobile menu', () => {
      const { container } = render(<DashboardNav user={adminUser} />)

      const dropdown = container.querySelector('.dropdown')
      expect(dropdown).toBeInTheDocument()
    })

    test('navigation links have correct href', () => {
      render(<DashboardNav user={adminUser} />)

      const packagesLink = screen.getAllByText('任务包管理')[0].closest('a')
      expect(packagesLink).toHaveAttribute('href', '/admin/packages')

      const mediaLink = screen.getAllByText('媒体资源')[0].closest('a')
      expect(mediaLink).toHaveAttribute('href', '/admin/media')

      const usersLink = screen.getAllByText('用户管理')[0].closest('a')
      expect(usersLink).toHaveAttribute('href', '/admin/users')
    })

    test('renders dropdown for user menu', () => {
      const { container } = render(<DashboardNav user={adminUser} />)

      const userDropdown = container.querySelector('.dropdown.dropdown-end')
      expect(userDropdown).toBeInTheDocument()
    })
  })

  describe('Active route highlighting', () => {
    const adminUser: SessionUser = {
      id: '1',
      username: 'admin_user',
      email: 'admin@test.com',
      role: 'ADMIN' as Role,
      status: 'ACTIVE' as UserStatus,
    }

    test('highlights packages route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/admin/packages/123')

      render(<DashboardNav user={adminUser} />)

      const packagesLink = screen.getAllByText('任务包管理')[0].closest('a')
      expect(packagesLink).toHaveClass('menu-active')
    })

    test('highlights media route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/admin/media')

      render(<DashboardNav user={adminUser} />)

      const mediaLink = screen.getAllByText('媒体资源')[0].closest('a')
      expect(mediaLink).toHaveClass('menu-active')
    })

    test('highlights users route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/admin/users')

      render(<DashboardNav user={adminUser} />)

      const usersLink = screen.getAllByText('用户管理')[0].closest('a')
      expect(usersLink).toHaveClass('menu-active')
    })
  })

  describe('Role-based rendering', () => {
    test('renders no navigation items for unknown role', () => {
      const unknownUser: SessionUser = {
        id: '4',
        username: 'unknown_user',
        email: 'unknown@test.com',
        role: 'UNKNOWN' as any,
        status: 'ACTIVE' as UserStatus,
      }

      const { container } = render(<DashboardNav user={unknownUser} />)

      // Should still render the navbar structure
      expect(container.querySelector('.navbar')).toBeInTheDocument()

      // But navigation items should be minimal
      expect(screen.queryByText('任务包管理')).not.toBeInTheDocument()
      expect(screen.queryByText('工作台')).not.toBeInTheDocument()
    })
  })
})
