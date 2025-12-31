'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import Button from '@/components/ui/Button'
import toast from '@/components/ui/Toast'

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

const MAX_DISTRIBUTE_COUNT = 200

export default function PackagesPage() {
  const [packages, setPackages] = useState<TaskPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 9
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [includeUnassigned, setIncludeUnassigned] = useState(true)
  const [taskCount, setTaskCount] = useState(MAX_DISTRIBUTE_COUNT)
  const [packageCount, setPackageCount] = useState(1)
  const [creating, setCreating] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<TaskPackage | null>(null)


  const fetchPackages = async (page: number = 1) => {
    try {
      const res = await fetch(`/api/packages?page=${page}&pageSize=${pageSize}`)
      const data = await res.json()
      if (data.success) {
        setPackages(data.data.items)
        setCurrentPage(data.data.page)
        setTotalPages(data.data.totalPages)
        setTotal(data.data.total)
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

  const createPackage = async () => {
    if (!formName.trim()) {
      toast.warn('请填写任务包名称')
      return
    }
    if (packageCount < 1 || !Number.isInteger(packageCount)) {
      toast.warn('请输入正确的包数量')
      return
    }
    setCreating(true)
    try {
      let mediaIds: string[] = []
      if (includeUnassigned) {
        const resMedia = await fetch(`/api/media?unassigned=true&page=1&pageSize=${taskCount * packageCount}`)
        const dataMedia = await resMedia.json()
        if (dataMedia?.success) {
          mediaIds = dataMedia.data.items.map((m: { id: string }) => m.id)
        }
      }

      // 批量创建任务包
      let successCount = 0
      const baseTasksPerPackage = Math.floor(mediaIds.length / packageCount)
      let currentMediaIndex = 0

      for (let i = 1; i <= packageCount; i++) {
        const packageName = packageCount === 1 ? formName.trim() : `${formName.trim()} (${i})`
        const endIndex = i === packageCount ? mediaIds.length : currentMediaIndex + baseTasksPerPackage
        const packageMediaIds = mediaIds.slice(currentMediaIndex, endIndex)
        currentMediaIndex = endIndex

        const res = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: packageName,
            description: formDesc || undefined,
            mediaIds: packageMediaIds,
          }),
        })
        const data = await res.json()
        if (data.success) {
          successCount++
        } else {
          console.error(`创建包「${packageName}」失败:`, data.error)
        }
      }

      if (successCount === packageCount) {
        setShowCreateModal(false)
        setFormName('')
        setFormDesc('')
        setIncludeUnassigned(true)
        setTaskCount(1000)
        setPackageCount(1)
        fetchPackages(1)
        toast.success(`成功创建 ${successCount} 个任务包`)
      } else {
        toast.warn(`成功创建 ${successCount}/${packageCount} 个任务包`)
        fetchPackages(1)
      }
    } catch (err) {
      console.error('Create packages error:', err)
      toast.error('创建失败')
    } finally {
      setCreating(false)
    }
  }

  const openDeleteModal = (pkg: TaskPackage) => {
    setDeleteTarget(pkg)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/packages/${deleteTarget.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setShowDeleteModal(false)
        setDeleteTarget(null)
        // 如果当前页删除后为空且有上一页，回退一页
        const nextPage = packages.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage
        await fetchPackages(nextPage)
        toast.success('任务包已删除')
      } else {
        toast.error(data.error || '删除失败')
      }
    } catch (err) {
      console.error('Delete package error:', err)
      toast.error('删除失败')
    } finally {
      setDeleting(false)
    }
  }

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

              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-sm btn-error btn-outline"
                  onClick={() => openDeleteModal(pkg)}
                >
                  删除
                </button>
                <Link href={`/admin/packages/${pkg.id}`} className="btn btn-sm btn-outline">
                  查看详情
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-base-content/60">
          共 {total} 个任务包，每页 {pageSize} 个
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => fetchPackages(page)}
        />
      </div>

      {packages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">暂无任务包，点击上方按钮创建</p>
        </div>
      )}

      {/* 创建任务包 Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">创建任务包</h3>
            <div className="form-control mb-3">
              <label className="label"><span className="label-text">名称</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="例如：2025-01 媒体包"
              />
            </div>
            <div className="form-control mb-3">
              <label className="label"><span className="label-text">描述</span></label>
              <textarea
                className="textarea textarea-bordered"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="可选"
              />
            </div>
            <div className="form-control mb-3">
              <label className="label"><span className="label-text">包数量</span></label>
              <input
                type="number"
                className="input input-bordered"
                value={packageCount}
                onChange={(e) => setPackageCount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </div>
            <div className="form-control mb-3">
              <label className="cursor-pointer label">
                <span className="label-text">包含所有未分配媒体</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={includeUnassigned}
                  onChange={(e) => setIncludeUnassigned(e.target.checked)}
                />
              </label>
            </div>
            {includeUnassigned && (
              <div className="form-control mb-3">
                <label className="label"><span className="label-text">任务数量（最多{MAX_DISTRIBUTE_COUNT}）</span></label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={taskCount}
                  onChange={(e) => setTaskCount(
                    Math.min(MAX_DISTRIBUTE_COUNT, Math.max(1, parseInt(e.target.value) || 1))
                  )}
                  min="1"
                  max={MAX_DISTRIBUTE_COUNT}
                />
              </div>
            )}
            <div className="modal-action">
              <Button
                type="primary"
                onClick={createPackage}
                loading={creating}
                loadingText="创建中..."
              >
                创建
              </Button>
              <button className="btn" onClick={() => setShowCreateModal(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
      {/* 删除任务包确认 Modal */}
      {showDeleteModal && deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">删除任务包</h3>
            <p className="py-4">确认删除任务包「{deleteTarget.name}」？其下所有任务将被一并删除。</p>
            <div className="modal-action">
              <Button
                type="error"
                onClick={confirmDelete}
                loading={deleting}
                loadingText="删除中..."
              >
                确认删除
              </Button>
              <button className="btn" onClick={() => setShowDeleteModal(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
