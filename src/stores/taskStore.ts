import { create } from 'zustand'
import type { Task, TaskPackage } from '@/types'

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  packages: TaskPackage[];
  isLoading: boolean;

  // Actions
  setTasks: (tasks: Task[]) => void;
  setCurrentTask: (task: Task | null) => void;
  setPackages: (packages: TaskPackage[]) => void;

  // API actions
  fetchTasks: (params?: Record<string, string>) => Promise<void>;
  fetchPackages: () => Promise<void>;
  claimTask: (taskId: string) => Promise<boolean>;
  submitTask: (taskId: string, data: unknown) => Promise<boolean>;
}

export const useTaskStore = create<TaskState>((set, _get) => ({
  tasks: [],
  currentTask: null,
  packages: [],
  isLoading: false,

  setTasks: (tasks) => set({ tasks }),
  setCurrentTask: (currentTask) => set({ currentTask }),
  setPackages: (packages) => set({ packages }),

  fetchTasks: async (params) => {
    set({ isLoading: true })
    try {
      const searchParams = new URLSearchParams(params)
      const res = await fetch(`/api/tasks?${searchParams}`)
      const data = await res.json()

      if (data.success) {
        set({ tasks: data.data.items })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPackages: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch('/api/packages')
      const data = await res.json()

      if (data.success) {
        set({ packages: data.data.items })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  claimTask: async (taskId) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/claim`, { method: 'POST' })
      const data = await res.json()
      return data.success
    } catch {
      return false
    }
  },

  submitTask: async (taskId, submitData) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })
      const data = await res.json()
      return data.success
    } catch {
      return false
    }
  },
}))
