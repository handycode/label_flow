'use client'

import { useEffect, useState } from 'react'

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

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (data.success) {
        setMedia(data.data.items)
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
        fetchMedia()
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
        <table className="table table-zebra">
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
              <tr key={item.id}>
                <td>{item.autoNumber}</td>
                <td className="max-w-xs truncate">{item.fileName}</td>
                <td>
                  <span className={`badge ${item.type === 'IMAGE' ? 'badge-info' : 'badge-secondary'}`}>
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
                  <button className="btn btn-ghost btn-xs">预览</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {media.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">暂无媒体资源，点击上方按钮从 S3 同步</p>
        </div>
      )}
    </div>
  )
}
