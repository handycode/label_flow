import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import DashboardNav from '@/components/layout/DashboardNav'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  // 检查用户账户是否被停用
  if (session.status !== 'ACTIVE') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-base-200">
      <DashboardNav user={session} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
