'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AnnotationCanvas from '@/components/annotation/AnnotationCanvas'
import Toolbar from '@/components/annotation/Toolbar'
import MetadataPanel from '@/components/annotation/MetadataPanel'

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
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LabelerTaskPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [mediaUrl, setMediaUrl] = useState<string>('')
  const [currentTool, setCurrentTool] = useState<'select' | 'rect' | 'ellipse'>('select')
  const [annotations, setAnnotations] = useState<AnnotationData[]>([])
  const [metadata, setMetadata] = useState<{
    remarks: string;
    score?: number;
  }>({
    remarks: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isReadOnly, setIsReadOnly] = useState(false)

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
          setAnnotations(data.data.annotations || [])
          setIsReadOnly(data.data.status === 'APPROVED')
          if (data.data.metadata) {
            setMetadata({
              remarks: data.data.metadata.remarks || '',
              score: data.data.metadata.score,
            })
          }
          // 获取媒体预签名 URL
          fetchMediaUrl(data.data.media.s3Key)
        }
      } catch (error) {
        console.error('Failed to fetch task:', error)
      } finally {
        setLoading(false)
      }
    }

    // 获取用户角色
    const fetchUserRole = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (data.success) {
          setUserRole(data.data.role)
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error)
      }
    }

    fetchTask()
    fetchUserRole()
  }, [id])



  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/tasks/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annotations,
          metadata,
        }),
      })
      const data = await res.json()
      if (data.success) {
        alert('提交成功！')
        router.push('/labeler/workspace')
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Failed to submit:', error)
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
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">
              {isReadOnly ? '查看任务' : '标注任务'}: {task.media.fileName}
            </h1>
            {isReadOnly && (
              <span className="badge badge-success">已通过</span>
            )}
          </div>
          <p className="text-sm text-base-content/60">
            类型: {task.media.type}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-ghost"
            onClick={() => router.push('/labeler/workspace')}
          >
            返回
          </button>
          {!isReadOnly && (
            <button
              className={`btn btn-primary ${submitting ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={submitting || annotations.length === 0}
              title={annotations.length === 0 ? '请至少添加一个标注' : ''}
            >
              {submitting ? '提交中...' : '提交标注'}
            </button>
          )}
        </div>
      </div>

      {/* 工具栏 */}
      {!isReadOnly && (
        <Toolbar
          currentTool={currentTool}
          onToolChange={setCurrentTool}
        />
      )}

      {/* 主内容区 */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* 画布区域 */}
        <div className="flex-1 bg-base-300 rounded-lg overflow-hidden">
          <AnnotationCanvas
            mediaUrl={mediaUrl}
            mediaType={task.media.type as 'IMAGE' | 'VIDEO'}
            currentTool={isReadOnly ? 'select' : currentTool}
            annotations={annotations}
            onAnnotationsChange={isReadOnly ? () => {} : setAnnotations}
            onToolChange={isReadOnly ? () => {} : setCurrentTool}
          />
        </div>

        {/* 右侧面板 */}
        <div className="w-80 flex-shrink-0">
          <MetadataPanel
            metadata={metadata}
            annotations={annotations}
            userRole={userRole || undefined}
            isReadOnly={isReadOnly}
            creator={task.createdBy}
            labeler={task.labeler}
            checker={task.checker}
          />
        </div>
      </div>
    </div>
  )
}
