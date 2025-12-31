'use client'

import { type Usable, use, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/Pagination'
import toast from '@/components/ui/Toast'

interface MediaRef {
  id: string
  fileName: string
  type: string
}

interface TaskItem {
  id: string
  status: string
  media: MediaRef
  createdAt: string
  updatedAt: string
}

interface PackageDetail {
  id: string
  name: string
  description?: string | null
  totalCount: number
  pendingCount?: number
  labelingCount?: number
  labeledCount?: number
  rejectedCount?: number
  approvedCount?: number
}

const TASKS_PER_PAGE = 20

export default function PackageTaskListPage({ params }: { params: Usable<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [pkg, setPkg] = useState<PackageDetail | null>(null)
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string>('LABELING')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // 获取任务包信息
      const pkgRes = await fetch(`/api/packages/${id}`)
      const pkgData = await pkgRes.json()
      if (pkgData.success) {
        setPkg(pkgData.data)
      }

      // 获取任务列表
      const statusParam = statusFilter !== 'ALL' ? `&status=${statusFilter}` : ''
      const tasksRes = await fetch(
        `/api/tasks?packageId=${id}&myTasks=true&page=${currentPage}&pageSize=${TASKS_PER_PAGE}${statusParam}`
      )
      const tasksData = await tasksRes.json()
      if (tasksData.success) {
        setTasks(tasksData.data.items)
        setTotalPages(tasksData.data.totalPages)
        setTotalCount(tasksData.data.total)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      toast.error('加载失败')
    } finally {
      setLoading(false)
    }
  }, [id, currentPage, statusFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const statusBadge = (status: string) => {
    const map: Record<string, { class: string; text: string }> = {
      PENDING: { class: 'badge-ghost', text: '待领取' },
      LABELING: { class: 'badge-info', text: '待标注' },
      LABELED: { class: 'badge-warning', text: '已标注' },
      CHECKING: { class: 'badge-accent', text: '质检中' },
      APPROVED: { class: 'badge-success', text: '已通过' },
      REJECTED: { class: 'badge-error', text: '已驳回' },
    }
    return map[status] || { class: 'badge-ghost', text: status }
  }

  const handleTaskClick = (taskId: string) => {
    router.push(`/labeler/workspace/task/${taskId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!pkg) {
    return <div className="alert alert-error">任务包不存在</div>
  }

  return (
    <div className="space-y-6">
      {/* 头部信息 */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{pkg.name}</h1>
          <p className="text-base-content/60 mt-1">{pkg.description || '暂无描述'}</p>
        </div>
        <Link href="/labeler/workspace" className="btn btn-outline">
          返回工作台
        </Link>
      </div>

      {/* 统计信息 */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">总任务数</div>
          <div className="stat-value text-2xl">{pkg.totalCount}</div>
        </div>
        <div className="stat">
          <div className="stat-title">待标注</div>
          <div className="stat-value text-2xl text-info">{pkg.labelingCount || 0}</div>
        </div>
        <div className="stat">
          <div className="stat-title">已驳回</div>
          <div className="stat-value text-2xl text-error">{pkg.rejectedCount || 0}</div>
        </div>
        <div className="stat">
          <div className="stat-title">已完成</div>
          <div className="stat-value text-2xl text-success">{pkg.approvedCount || 0}</div>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">
              我的任务
              <span className="badge badge-primary">{totalCount}</span>
            </h2>
            <div className="tabs tabs-boxed">
              <button
                className={`tab tab-sm ${statusFilter === 'ALL' ? 'tab-active' : ''}`}
                onClick={() => { setStatusFilter('ALL'); setCurrentPage(1) }}
              >
                全部
              </button>
              <button
                className={`tab tab-sm ${statusFilter === 'LABELING' ? 'tab-active' : ''}`}
                onClick={() => { setStatusFilter('LABELING'); setCurrentPage(1) }}
              >
                待标注
              </button>
              <button
                className={`tab tab-sm ${statusFilter === 'LABELED' ? 'tab-active' : ''}`}
                onClick={() => { setStatusFilter('LABELED'); setCurrentPage(1) }}
              >
                已标注
              </button>
              <button
                className={`tab tab-sm ${statusFilter === 'REJECTED' ? 'tab-active' : ''}`}
                onClick={() => { setStatusFilter('REJECTED'); setCurrentPage(1) }}
              >
                已驳回
              </button>
              <button
                className={`tab tab-sm ${statusFilter === 'APPROVED' ? 'tab-active' : ''}`}
                onClick={() => { setStatusFilter('APPROVED'); setCurrentPage(1) }}
              >
                已通过
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>媒体文件</th>
                  <th>类型</th>
                  <th>状态</th>
                  <th>更新时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => {
                  const status = statusBadge(task.status)
                  return (
                    <tr key={task.id} className="hover">
                      <td>{(currentPage - 1) * TASKS_PER_PAGE + index + 1}</td>
                      <td className="max-w-xs truncate">{task.media.fileName}</td>
                      <td>
                        <span className="badge badge-sm">
                          {task.media.type === 'IMAGE' ? '图片' : '视频'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${status.class}`}>{status.text}</span>
                      </td>
                      <td className="text-sm">
                        {new Date(task.updatedAt).toLocaleString('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${
                            task.status === 'REJECTED'
                              ? 'btn-warning'
                              : task.status === 'APPROVED'
                                ? 'btn-ghost'
                                : 'btn-primary'
                          }`}
                          onClick={() => handleTaskClick(task.id)}
                          disabled={
                            task.status !== 'LABELING' &&
                            task.status !== 'CHECKING' &&
                            task.status !== 'REJECTED' &&
                            task.status !== 'APPROVED'
                          }
                        >
                          {task.status === 'REJECTED'
                            ? '修改标注'
                            : task.status === 'APPROVED'
                              ? '查看'
                              : task.status === 'LABELING'
                                ? '继续标注'
                                : '查看'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {tasks.length === 0 && (
              <div className="text-center py-8 text-base-content/60">暂无任务</div>
            )}
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
