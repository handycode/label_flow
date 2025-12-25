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
  labeler?: { id: string; username: string };
  _count: { annotations: number };
}

export default function CheckerWorkspacePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'available' | 'my'>('available')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/tasks${filter === 'available' ? '?status=LABELED' : ''}`)
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
        window.location.href = `/checker/workspace/${taskId}`
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Failed to claim task:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      LABELED: 'badge-warning',
      CHECKING: 'badge-info',
      APPROVED: 'badge-success',
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
        <h1 className="text-2xl font-bold">质检工作台</h1>
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${filter === 'available' ? 'tab-active' : ''}`}
            onClick={() => setFilter('available')}
          >
            待质检任务
          </button>
          <button
            className={`tab ${filter === 'my' ? 'tab-active' : ''}`}
            onClick={() => setFilter('my')}
          >
            我的质检
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
                标注员: {task.labeler?.username || '-'}
              </p>
              <p className="text-sm">
                标注数: {task._count.annotations}
              </p>

              <div className="card-actions justify-end mt-4">
                {task.status === 'LABELED' ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => claimTask(task.id)}
                  >
                    开始质检
                  </button>
                ) : task.status === 'CHECKING' ? (
                  <Link
                    href={`/checker/workspace/${task.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    继续质检
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
            {filter === 'available' ? '暂无待质检的任务' : '暂无进行中的质检任务'}
          </p>
        </div>
      )}
    </div>
  )
}
