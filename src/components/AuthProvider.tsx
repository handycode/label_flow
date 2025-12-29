'use client'

import { ReactNode, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { usePathname } from 'next/navigation'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { checkAuth, isLoading } = useAuthStore()
  const pathname = usePathname()

  useEffect(() => {
    // 初始化认证检查
    checkAuth()
  }, [checkAuth])

  // 在加载时显示加载状态
  if (isLoading && !pathname.includes('/login')) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return <>{children}</>
}
