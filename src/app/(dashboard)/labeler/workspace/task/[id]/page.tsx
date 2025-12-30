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
    issues?: string[];
    videoClips?: unknown[];
    croppedAreas?: unknown[];
  };
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
  const [metadata, setMetadata] = useState({
    remarks: '',
    issues: [] as string[],
  })
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
          setAnnotations(data.data.annotations || [])
          if (data.data.metadata) {
            setMetadata({
              remarks: data.data.metadata.remarks || '',
              issues: data.data.metadata.issues || [],
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
    fetchTask()
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
          <h1 className="text-xl font-bold">
            标注任务: {task.media.fileName}
          </h1>
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
          <button
            className={`btn btn-primary ${submitting ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? '提交中...' : '提交标注'}
          </button>
        </div>
      </div>

      {/* 工具栏 */}
      <Toolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
      />

      {/* 主内容区 */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* 画布区域 */}
        <div className="flex-1 bg-base-300 rounded-lg overflow-hidden">
          <AnnotationCanvas
            mediaUrl={mediaUrl}
            mediaType={task.media.type as 'IMAGE' | 'VIDEO'}
            currentTool={currentTool}
            annotations={annotations}
            onAnnotationsChange={setAnnotations}
            onToolChange={setCurrentTool}
          />
        </div>

        {/* 右侧面板 */}
        <div className="w-80 flex-shrink-0">
          <MetadataPanel
            metadata={metadata}
            onMetadataChange={setMetadata}
            annotations={annotations}
          />
        </div>
      </div>
    </div>
  )
}
