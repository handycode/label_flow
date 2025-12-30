'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { RoleName, type SessionUser } from '@/types'
import { cn } from '@/lib/utils'
import { UserCircle2Icon } from "lucide-react"

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
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn('py-2 text-lg', { 'menu-active': pathname.startsWith(item.href) })}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Label Flow
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {navItems.map((item) => (
            <li key={item.href} className="item">
              <Link href={item.href}
                className={cn('py-1 text-lg', { 'menu-active': pathname.startsWith(item.href) })}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <div className="flex items-center gap-2">
              <UserCircle2Icon />
              <span className="badge badge-xs badge-primary">{RoleName[user.role]}</span>
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
