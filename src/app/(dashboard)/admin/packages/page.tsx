'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface TaskPackage {
  id: string;
  name: string;
  description?: string;
  status: string;
  totalCount: number;
  createdBy: { id: string; username: string };
  createdAt: string;
  pendingCount?: number;
  labelingCount?: number;
  labeledCount?: number;
  checkingCount?: number;
  approvedCount?: number;
  rejectedCount?: number;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<TaskPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [_showCreateModal, setShowCreateModal] = useState(false)


  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages')
      const data = await res.json()
      if (data.success) {
        setPackages(data.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      DRAFT: 'badge-ghost',
      ACTIVE: 'badge-primary',
      COMPLETED: 'badge-success',
      ARCHIVED: 'badge-neutral',
    }
    return badges[status] || 'badge-ghost'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">任务包管理</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          创建任务包
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {pkg.name}
                <span className={`badge ${getStatusBadge(pkg.status)}`}>
                  {pkg.status}
                </span>
              </h2>
              <p className="text-base-content/60">{pkg.description || '暂无描述'}</p>

              <div className="stats stats-vertical shadow mt-4">
                <div className="stat py-2">
                  <div className="stat-title">总任务数</div>
                  <div className="stat-value text-lg">{pkg.totalCount}</div>
                </div>
                <div className="stat py-2">
                  <div className="stat-title">进度</div>
                  <div className="flex gap-1 flex-wrap">
                    <span className="badge badge-ghost badge-sm">待分配: {pkg.pendingCount || 0}</span>
                    <span className="badge badge-info badge-sm">标注中: {pkg.labelingCount || 0}</span>
                    <span className="badge badge-warning badge-sm">待质检: {pkg.labeledCount || 0}</span>
                    <span className="badge badge-success badge-sm">已通过: {pkg.approvedCount || 0}</span>
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link href={`/admin/packages/${pkg.id}`} className="btn btn-sm btn-outline">
                  查看详情
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">暂无任务包，点击上方按钮创建</p>
        </div>
      )}
    </div>
  )
}
