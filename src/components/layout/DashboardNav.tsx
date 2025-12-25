'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { SessionUser } from '@/types'

interface Props {
  user: SessionUser;
}

export default function DashboardNav({ user }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const getNavItems = () => {
    switch (user.role) {
      case 'ADMIN':
        return [
          { href: '/admin/packages', label: '任务包管理' },
          { href: '/admin/media', label: '媒体资源' },
          { href: '/admin/users', label: '用户管理' },
        ]
      case 'LABELER':
        return [
          { href: '/labeler/workspace', label: '工作台' },
        ]
      case 'CHECKER':
        return [
          { href: '/checker/workspace', label: '质检工作台' },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Label Flow
        </Link>
        <div className="hidden md:flex ml-4">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname.startsWith(item.href) ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary">{user.role}</span>
              <span>{user.username}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={handleLogout}>退出登录</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
