'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AnnotationCanvas from '@/components/annotation/AnnotationCanvas'

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
  annotations: AnnotationData[];
  metadata?: {
    remarks?: string;
    issues?: string[];
  };
  qualityScores?: {
    score: number;
    feedback?: string;
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
  const [feedback, setFeedback] = useState('')
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
          feedback,
        }),
      })
      const data = await res.json()
      if (data.success) {
        alert(approved ? '已通过！' : '已驳回！')
        router.push('/checker/workspace')
      } else {
        alert(data.error)
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

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* 头部 */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">
            质检任务: {task.media.fileName}
          </h1>
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
          {/* 标注信息 */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">标注信息</h3>
              <div className="text-sm space-y-2">
                <p>标注数量: {task.annotations.length}</p>
                {task.metadata?.remarks && (
                  <div>
                    <p className="font-medium">备注:</p>
                    <p className="text-base-content/60">{task.metadata.remarks}</p>
                  </div>
                )}
                {task.metadata?.issues && task.metadata.issues.length > 0 && (
                  <div>
                    <p className="font-medium">问题标记:</p>
                    <ul className="list-disc list-inside text-base-content/60">
                      {task.metadata.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

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
                    />
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">反馈意见</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="请输入反馈意见..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  className={`btn btn-error flex-1 ${submitting ? 'loading' : ''}`}
                  onClick={() => handleReview(false)}
                  disabled={submitting}
                >
                  驳回
                </button>
                <button
                  className={`btn btn-success flex-1 ${submitting ? 'loading' : ''}`}
                  onClick={() => handleReview(true)}
                  disabled={submitting}
                >
                  通过
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
