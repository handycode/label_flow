'use client'

import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'

interface MediaResource {
  id: string;
  s3Key: string;
  type: string;
  fileName: string;
  fileSize: number;
  autoNumber: number;
  task?: { id: string; status: string };
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaResource[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 20
  const [previewItem, setPreviewItem] = useState<MediaResource | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loadingPreview, setLoadingPreview] = useState(false)

  const fetchMedia = async (page: number = 1) => {
    try {
      const res = await fetch(`/api/media?page=${page}&pageSize=${pageSize}`)
      const data = await res.json()
      if (data.success) {
        setMedia(data.data.items)
        setCurrentPage(data.data.page)
        setTotalPages(data.data.totalPages)
        setTotal(data.data.total)
      }
    } catch (error) {
      console.error('Failed to fetch media:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const syncMedia = async () => {
    setSyncing(true)
    try {
      const res = await fetch('/api/media', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        alert(`同步完成：新增 ${data.data.created} 个，跳过 ${data.data.skipped} 个`)
        fetchMedia(1)
      }
    } catch (error) {
      console.error('Failed to sync media:', error)
    } finally {
      setSyncing(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes  } B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)  } KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)  } MB`
  }

  const openPreview = async (item: MediaResource) => {
    setPreviewItem(item)
    setLoadingPreview(true)
    try {
      const res = await fetch(`/api/media/presigned/${encodeURIComponent(item.s3Key)}`)
      const data = await res.json()
      if (data.success) {
        setPreviewUrl(data.data.url)
      }
    } catch (error) {
      console.error('Failed to get presigned URL:', error)
    } finally {
      setLoadingPreview(false)
    }
  }

  const closePreview = () => {
    setPreviewItem(null)
    setPreviewUrl(null)
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
        <h1 className="text-2xl font-bold">媒体资源</h1>
        <button
          className={`btn btn-primary ${syncing ? 'loading' : ''}`}
          onClick={syncMedia}
          disabled={syncing}
        >
          {syncing ? '同步中...' : '同步 S3 资源'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-sm table-zebra">
          <thead>
            <tr>
              <th>编号</th>
              <th>文件名</th>
              <th>类型</th>
              <th>大小</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {media.map((item) => (
              <tr key={item.id} onClick={() => openPreview(item)} className="hover:bg-base-300">
                <td>{item.autoNumber}</td>
                <td className="max-w-xs truncate">{item.fileName}</td>
                <td>
                  <span className={`badge badge-sm ${item.type === 'IMAGE' ? 'badge-info' : 'badge-secondary'}`}>
                    {item.type}
                  </span>
                </td>
                <td>{formatSize(item.fileSize)}</td>
                <td>
                  {item.task ? (
                    <span className="badge badge-success">已分配</span>
                  ) : (
                    <span className="badge badge-ghost">未分配</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-outline btn-sm"
                    onClick={() => openPreview(item)}
                  >
                    预览
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-base-content/60">
          共 {total} 条记录，每页 {pageSize} 条
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => fetchMedia(page)}
        />
      </div>

      {media.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">暂无媒体资源，点击上方按钮从 S3 同步</p>
        </div>
      )}

      {/* 预览 Modal */}
      {previewItem && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{previewItem.fileName}</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={closePreview}
              >
                ✕
              </button>
            </div>

            <div className="bg-base-200 rounded p-4 flex items-center justify-center min-h-96">
              {loadingPreview ? (
                <div className="flex flex-col items-center gap-4">
                  <span className="loading loading-spinner loading-lg"></span>
                  <p className="text-base-content/60">加载中...</p>
                </div>
              ) : previewUrl ? (
                previewItem.type === 'IMAGE' ? (
                  <img
                    src={previewUrl}
                    alt={previewItem.fileName}
                    className="max-w-full max-h-96 rounded object-contain"
                  />
                ) : (
                  <video
                    controls
                    src={previewUrl}
                    className="max-w-full max-h-96 rounded"
                  />
                )
              ) : (
                <p className="text-base-content/60">预览加载失败</p>
              )}
            </div>

            <div className="mt-6 p-4 bg-base-200 rounded">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-base-content/60">编号</p>
                  <p className="font-semibold">{previewItem.autoNumber}</p>
                </div>
                <div>
                  <p className="text-base-content/60">类型</p>
                  <p className="font-semibold">{previewItem.type}</p>
                </div>
                <div>
                  <p className="text-base-content/60">大小</p>
                  <p className="font-semibold">{formatSize(previewItem.fileSize)}</p>
                </div>
                <div>
                  <p className="text-base-content/60">状态</p>
                  <p className="font-semibold">
                    {previewItem.task ? '已分配' : '未分配'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-base-content/60">S3 Key</p>
                  <p className="font-mono text-xs break-all">{previewItem.s3Key}</p>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={closePreview}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
