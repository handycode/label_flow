'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AnnotationCanvas from '@/components/annotation/AnnotationCanvas'
import MetadataPanel from '@/components/annotation/MetadataPanel'
import Button from '@/components/ui/Button'
import toast from '@/components/ui/Toast'

interface AnnotationData {
  id: string;
  type: string;
  coordinates: Record<string, number>;
  label?: string | null;
  frameTime?: number | null;
}

interface Task {
  id: string;
  status: string;
  media: {
    id: string;
    s3Key: string;
    fileName: string;
    type: string;
  };
  labeler?: { id: string; username: string };
  checker?: { id: string; username: string };
  package?: {
    createdBy?: { id: string; username: string };
  };
  annotations: AnnotationData[];
  metadata?: {
    remarks?: string;
    score?: number;
  };
  qualityScores?: {
    score: number;
  }[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CheckerTaskPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [mediaUrl, setMediaUrl] = useState<string>('')
  const [score, setScore] = useState(5)
  const [remarks, setRemarks] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
          setRemarks(data.data.metadata?.remarks || '')
          // 如果任务已经被质检过，读取已保存的评分
          if (data.data.qualityScores && data.data.qualityScores.length > 0) {
            setScore(data.data.qualityScores[0].score)
          }
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



  const handleReview = async (approved: boolean) => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/tasks/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approved,
          score,
          remarks,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(approved ? '已通过！' : '已驳回！')
        router.push('/checker/workspace')
      } else {
        toast.error(data.error || '提交失败')
      }
    } catch (error) {
      console.error('Failed to review:', error)
    } finally {
      setSubmitting(false)
    }
  }

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

  const isReadOnly = task.status === 'APPROVED' || task.status === 'REJECTED'

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* 头部 */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">
              质检任务: {task.media.fileName}
            </h1>
            {isReadOnly && (
              <span className={`badge ${task.status === 'APPROVED' ? 'badge-success' : 'badge-error'}`}>
                {task.status === 'APPROVED' ? '已通过' : '已驳回'}
              </span>
            )}
          </div>
          <p className="text-sm text-base-content/60">
            标注员: {task.labeler?.username || '-'} | 标注数: {task.annotations.length}
          </p>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => router.push('/checker/workspace')}
        >
          返回
        </button>
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

        {/* 右侧质检面板 */}
        <div className="w-80 flex-shrink-0 space-y-4">
          {/* 任务信息和标注列表 */}
          <MetadataPanel
            metadata={{
              remarks: task.metadata?.remarks || '',
              score: task.metadata?.score,
            }}
            annotations={task.annotations}
            userRole="CHECKER"
            isReadOnly={true}
            creator={task.package?.createdBy}
            labeler={task.labeler}
            checker={task.checker}
          />

          {/* 质检评分 */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">质检评分</h3>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">评分 (1-5分)</span>
                </label>
                <div className="rating rating-lg">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <input
                      key={s}
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400"
                      checked={score === s}
                      onChange={() => setScore(s)}
                      disabled={isReadOnly}
                    />
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">备注反馈</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="请输入备注反馈..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  disabled={isReadOnly}
                />
              </div>

              {!isReadOnly && (
                <div className="flex gap-2 mt-4">
                  <Button
                    type="error"
                    onClick={() => handleReview(false)}
                    loading={submitting}
                    className="flex-1"
                  >
                    驳回
                  </Button>
                  <Button
                    type="success"
                    onClick={() => handleReview(true)}
                    loading={submitting}
                    className="flex-1"
                  >
                    通过
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
