import { create } from 'zustand'
import type { SessionUser } from '@/types'

interface AuthState {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  inactiveWarning: string | null;
  setUser: (user: SessionUser | null) => void;
  login: (email: string, password: string) => Promise<boolean | string>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearInactiveWarning: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  inactiveWarning: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (data.success) {
        // 检查用户状态
        if (data.data.user.status !== 'ACTIVE') {
          set({ inactiveWarning: '您的账号已被停用，请联系管理员' })
          return false
        }
        set({ user: data.data.user, isAuthenticated: true, inactiveWarning: null })
        return true
      }
      return false
    } catch {
      return false
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      set({ user: null, isAuthenticated: false, inactiveWarning: null })
    }
  },

  checkAuth: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (data.success) {
        // 检查用户状态
        if (data.data.status !== 'ACTIVE') {
          set({ user: null, isAuthenticated: false, inactiveWarning: '您的账号已被停用，请联系管理员' })
        } else {
          set({ user: data.data, isAuthenticated: true, inactiveWarning: null })
        }
      } else {
        set({ user: null, isAuthenticated: false, inactiveWarning: null })
      }
    } catch {
      set({ user: null, isAuthenticated: false, inactiveWarning: null })
    } finally {
      set({ isLoading: false })
    }
  },

  clearInactiveWarning: () => set({ inactiveWarning: null }),
}))
