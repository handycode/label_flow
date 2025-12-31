'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AnnotationCanvas from '@/components/annotation/AnnotationCanvas'
import MetadataPanel from '@/components/annotation/MetadataPanel'
import StatusBadge from '@/components/ui/StatusBadge'

interface AnnotationData {
  id: string;
  type: string;
  coordinates: Record<string, number>;
  label?: string | null;
  frameTime?: number | null;
}

interface Task {
  id: string;
  packageId: string;
  status: string;
  media: {
    id: string;
    s3Key: string;
    fileName: string;
    type: string;
  };
  annotations: AnnotationData[];
  metadata?: {
    remarks?: string;
    score?: number;
    videoClips?: unknown[];
    croppedAreas?: unknown[];
  };
  createdBy?: { id: string; username: string };
  labeler?: { id: string; username: string };
  checker?: { id: string; username: string };
  qualityScores?: {
    score: number;
    remarks?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminTaskViewPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [mediaUrl, setMediaUrl] = useState<string>('')

  const fetchMediaUrl = async (s3Key: string) => {
    try {
      const res = await fetch(`/api/media/presigned/${encodeURIComponent(s3Key)}`)
      const data = await res.json()
      if (data.success) {
        setMediaUrl(data.data.url)
      }
    } catch (error) {
      console.error('Failed to fetch media URL:', error)
    }
  }

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`)
        const data = await res.json()
        if (data.success) {
          setTask(data.data)
          fetchMediaUrl(data.data.media.s3Key)
        }
      } catch (error) {
        console.error('Failed to fetch task:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-error">任务不存在</p>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* 头部 */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">
              查看任务: {task.media.fileName}
            </h1>
            <StatusBadge status={task.status} />
          </div>
          <div className="text-sm text-base-content/60 mt-1">
            <p>类型: {task.media.type} | 标注数: {task.annotations.length}</p>
            <p>创建时间: {new Date(task.createdAt).toLocaleString('zh-CN')}</p>
            {task.updatedAt && (
              <p>更新时间: {new Date(task.updatedAt).toLocaleString('zh-CN')}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-ghost"
            onClick={() => router.back()}
          >
            返回
          </button>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/admin/packages/${task.packageId}`)}
          >
            查看数据包
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* 画布区域 - 只读模式 */}
        <div className="flex-1 bg-base-300 rounded-lg overflow-hidden">
          <AnnotationCanvas
            mediaUrl={mediaUrl}
            mediaType={task.media.type as 'IMAGE' | 'VIDEO'}
            currentTool="select"
            annotations={task.annotations}
            onAnnotationsChange={() => {}}
            readOnly
          />
        </div>

        {/* 右侧信息面板 */}
        <div className="w-80 flex-shrink-0 space-y-4">
          {/* 任务信息和标注列表 */}
          <MetadataPanel
            metadata={{
              remarks: task.metadata?.remarks || '',
              score: task.metadata?.score,
            }}
            annotations={task.annotations}
            userRole="ADMIN"
            isReadOnly={true}
            creator={task.createdBy}
            labeler={task.labeler}
            checker={task.checker}
          />

          {/* 质检信息 */}
          {task.qualityScores && task.qualityScores.length > 0 && (
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title text-base">质检信息</h3>
                {task.qualityScores.map((qs, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/60">评分</span>
                      <div className="flex items-center gap-2">
                        <div className="rating rating-sm">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <input
                              key={star}
                              type="radio"
                              className="mask mask-star-2 bg-orange-400"
                              checked={star === qs.score}
                              disabled
                              readOnly
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">{qs.score}</span>
                      </div>
                    </div>
                    {qs.remarks && (
                      <div>
                        <span className="text-sm text-base-content/60">备注</span>
                        <p className="text-sm mt-1">{qs.remarks}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
