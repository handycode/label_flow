'use client'

import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export default function InactiveUserAlert() {
  const { user, inactiveWarning, clearInactiveWarning } = useAuthStore()

  // 检查用户状态
  useEffect(() => {
    if (user && user.status !== 'ACTIVE') {
      // 如果用户状态不是 ACTIVE，应该已经在 checkAuth 时被清除
    }
  }, [user])

  if (!inactiveWarning) return null

  return (
    <div className="alert alert-error shadow-lg mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2"
        />
      </svg>
      <div>
        <h3 className="font-bold">账户被停用</h3>
        <div className="text-xs">{inactiveWarning}</div>
      </div>
      <button
        className="btn btn-sm"
        onClick={() => clearInactiveWarning()}
      >
        关闭
      </button>
    </div>
  )
}
