'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Task {
  id: string;
  status: string;
  media: {
    id: string;
    fileName: string;
    type: string;
    autoNumber: number;
  };
  package: { id: string; name: string };
  _count: { annotations: number };
}

export default function LabelerWorkspacePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'available' | 'my'>('available')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/tasks${filter === 'available' ? '?status=PENDING' : ''}`)
        const data = await res.json()
        if (data.success) {
          setTasks(data.data.items)
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [filter])


  const claimTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/claim`, { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        // 跳转到标注页面
        window.location.href = `/labeler/workspace/${taskId}`
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Failed to claim task:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      PENDING: 'badge-ghost',
      LABELING: 'badge-info',
      LABELED: 'badge-success',
      REJECTED: 'badge-error',
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
        <h1 className="text-2xl font-bold">标注工作台</h1>
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${filter === 'available' ? 'tab-active' : ''}`}
            onClick={() => setFilter('available')}
          >
            可领取任务
          </button>
          <button
            className={`tab ${filter === 'my' ? 'tab-active' : ''}`}
            onClick={() => setFilter('my')}
          >
            我的任务
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                #{task.media.autoNumber} {task.media.fileName}
                <span className={`badge ${getStatusBadge(task.status)}`}>
                  {task.status}
                </span>
              </h2>
              <p className="text-base-content/60">
                任务包: {task.package.name}
              </p>
              <p className="text-sm">
                类型: <span className="badge badge-sm">{task.media.type}</span>
              </p>

              <div className="card-actions justify-end mt-4">
                {task.status === 'PENDING' || task.status === 'REJECTED' ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => claimTask(task.id)}
                  >
                    领取任务
                  </button>
                ) : task.status === 'LABELING' ? (
                  <Link
                    href={`/labeler/workspace/${task.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    继续标注
                  </Link>
                ) : (
                  <span className="text-sm text-base-content/60">已完成</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">
            {filter === 'available' ? '暂无可领取的任务' : '暂无进行中的任务'}
          </p>
        </div>
      )}
    </div>
  )
}
