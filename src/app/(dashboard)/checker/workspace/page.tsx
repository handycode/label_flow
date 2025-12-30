'use client'

import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'
import toast from '@/components/ui/Toast'

interface Package {
  id: string;
  name: string;
  description: string;
  totalCount: number;
  completedCount: number;
  createdBy: { username: string };
  createdAt: string;
  labeledCount?: number;
  checkingCount?: number;
  approvedCount?: number;
  rejectedCount?: number;
  _count: { tasks: number };
}

export default function CheckerWorkspacePage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'available' | 'my'>('my')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 12

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true)
      try {
        const url = `/api/packages?page=${currentPage}&pageSize=${pageSize}&filter=${filter}`
        const res = await fetch(url)
        const data = await res.json()
        if (data.success) {
          setPackages(data.data.items)
          setTotalPages(data.data.totalPages)
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [filter, currentPage])

  const claimPackage = async (packageId: string) => {
    try {
      const res = await fetch(`/api/packages/${packageId}/claim`, { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        toast.success(data.data.message)
        // Refresh the package list
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast.error(data.error || '领取失败')
      }
    } catch (error) {
      console.error('Failed to claim package:', error)
      toast.error('领取失败')
    }
  }

  const getFirstTask = async (packageId: string) => {
    try {
      const res = await fetch(`/api/tasks?packageId=${packageId}&myTasks=true&pageSize=1`)
      const data = await res.json()
      if (data.success && data.data.items.length > 0) {
        const taskId = data.data.items[0].id
        window.location.href = `/checker/workspace/${taskId}`
      } else {
        toast.error('没有找到可质检的任务')
      }
    } catch (error) {
      console.error('Failed to get first task:', error)
      toast.error('获取任务失败')
    }
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
        <h1 className="text-2xl font-bold">质检工作台</h1>
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${filter === 'my' ? 'tab-active' : ''}`}
            onClick={() => {
              setFilter('my')
              setCurrentPage(1)
            }}
          >
            我的质检包
          </button>
          <button
            className={`tab ${filter === 'available' ? 'tab-active' : ''}`}
            onClick={() => {
              setFilter('available')
              setCurrentPage(1)
            }}
          >
            待质检任务包
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => {
          const hasClaimableTasks = (pkg.labeledCount || 0) > 0
          const hasWorkingTasks = (pkg.checkingCount || 0) > 0

          return (
            <div key={pkg.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{pkg.name}</h2>
                {pkg.description && (
                  <p className="text-sm text-base-content/60">{pkg.description}</p>
                )}

                <div className="stats stats-vertical shadow mt-2">
                  <div className="stat py-2">
                    <div className="stat-title text-xs">任务总数</div>
                    <div className="stat-value text-2xl">{pkg._count.tasks}</div>
                  </div>
                  {filter === 'available' && (
                    <>
                      <div className="stat py-2">
                        <div className="stat-title text-xs">待质检</div>
                        <div className="stat-value text-2xl text-warning">
                          {pkg.labeledCount || 0}
                        </div>
                      </div>
                    </>
                  )}
                  {filter === 'my' && (
                    <>
                      <div className="stat py-2">
                        <div className="stat-title text-xs">质检中</div>
                        <div className="stat-value text-2xl text-info">
                          {pkg.checkingCount || 0}
                        </div>
                      </div>
                      <div className="stat py-2">
                        <div className="stat-title text-xs">已通过</div>
                        <div className="stat-value text-2xl text-success">
                          {pkg.approvedCount || 0}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="card-actions justify-end mt-4">
                  {filter === 'available' && hasClaimableTasks && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => claimPackage(pkg.id)}
                    >
                      领取质检包
                    </button>
                  )}
                  {filter === 'my' && hasWorkingTasks && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => getFirstTask(pkg.id)}
                    >
                      继续质检
                    </button>
                  )}
                  {filter === 'available' && !hasClaimableTasks && (
                    <span className="text-sm text-base-content/60">暂无待质检任务</span>
                  )}
                  {filter === 'my' && !hasWorkingTasks && (
                    <span className="text-sm text-base-content/60">已完成</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">
            {filter === 'available' ? '暂无待质检的任务包' : '暂无进行中的质检包'}
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}
