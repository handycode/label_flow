'use client'

import { type Usable, use, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import toast from '@/components/ui/Toast'
import Pagination from '@/components/Pagination'

interface UserRef { id: string; username: string }
interface MediaRef { id: string; fileName: string; type: string }

interface TaskItem {
  id: string
  status: string
  media: MediaRef
  labeler?: UserRef | null
  checker?: UserRef | null
}

interface PackageDetail {
  id: string
  name: string
  description?: string | null
  status: string
  totalCount: number
  createdBy: UserRef
  tasks: TaskItem[]
}

const TASKS_PER_PAGE = 20
const MAX_DISTRIBUTE_COUNT = 200

export default function PackageDetailPage({ params }: { params: Usable<{id: string}> }) {
  const { id } = use(params)
  const [pkg, setPkg] = useState<PackageDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [distributing, setDistributing] = useState(false)
  const [distributeLimit, setDistributeLimit] = useState(MAX_DISTRIBUTE_COUNT)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchDetail = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/packages/${id}`)
      const data = await res.json()
      if (data.success) setPkg(data.data)
    } catch (err) {
      console.error('Fetch package detail error:', err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { fetchDetail() }, [fetchDetail])

  const distributeAll = async () => {
    setDistributing(true)
    try {
      const res = await fetch(`/api/packages/${id}/distribute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: distributeLimit }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`分配完成：新增 ${data.data.created} 个任务`)
        fetchDetail()
      } else {
        toast.error(data.error || '分配失败')
      }
    } catch (err) {
      console.error('Distribute error:', err)
      toast.error('分配失败')
    } finally {
      setDistributing(false)
    }
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'badge-ghost',
      LABELING: 'badge-info',
      LABELED: 'badge-warning',
      CHECKING: 'badge-accent',
      APPROVED: 'badge-success',
      REJECTED: 'badge-error',
    }
    return map[status] || 'badge-ghost'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!pkg) {
    return <div className="alert alert-error">任务包不存在 {id}</div>
  }

  // 分页逻辑
  const totalPages = Math.ceil(pkg.tasks.length / TASKS_PER_PAGE)
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE
  const endIndex = startIndex + TASKS_PER_PAGE
  const currentTasks = pkg.tasks.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div>
          <h1 className="text-2xl font-bold">{pkg.name}</h1>
          <p className="text-base-content/60">{pkg.description || '暂无描述'}</p>
        </div>
        <div className="stats shadow ml-2">
          <div className="stat py-2 px-4">
            <div className="stat-title">总任务数</div>
            <div className="stat-value text-lg">{pkg.totalCount}</div>
          </div>
        </div>
        <div className="ml-auto mr-2">
          {pkg.totalCount < MAX_DISTRIBUTE_COUNT && pkg.status === 'PENDING' && (
          <div className="flex gap-2 items-center">
            <div className="form-control">
              <label className="label py-0">
                <span className="label-text text-xs">任务数（最多{MAX_DISTRIBUTE_COUNT}）</span>
              </label>
              <input
                type="number"
                className="input input-bordered input-sm w-32"
                value={Math.min(distributeLimit, MAX_DISTRIBUTE_COUNT - pkg.totalCount)}
                onChange={(e) => setDistributeLimit(
                  Math.min(MAX_DISTRIBUTE_COUNT, Math.max(1, parseInt(e.target.value) || 1))
                )}
                min="1"
                max={MAX_DISTRIBUTE_COUNT}
              />
            </div>
            <Button
              type="primary"
              onClick={distributeAll}
              loading={distributing}
              disabled={pkg.totalCount >= MAX_DISTRIBUTE_COUNT}
              loadingText="分配中..."
            >
              分配未分配媒体
            </Button>
          </div>
          )}
        </div>
        <Link href="/admin/packages" className="btn btn-outline">返回</Link>
      </div>



      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>媒体</th>
              <th>状态</th>
              <th>标注员</th>
              <th>质检员</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((t) => (
              <tr key={t.id}>
                <td className="max-w-sm truncate">{t.media?.fileName}</td>
                <td>
                  <span className={`badge ${statusBadge(t.status)}`}>{t.status}</span>
                </td>
                <td>{t.labeler?.username || '-'}</td>
                <td>{t.checker?.username || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {pkg.tasks.length === 0 && (
          <div className="text-center py-8 text-base-content/60">
            暂无任务
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
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