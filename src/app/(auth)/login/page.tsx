'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Login failed')
        return
      }

      // 检查用户状态
      if (data.data.user.status !== 'ACTIVE') {
        setError('您的账号已被停用，请联系管理员')
        return
      }

      // 根据角色跳转到不同页面
      const role = data.data.user.role
      if (role === 'ADMIN') {
        router.push('/admin/packages')
      } else if (role === 'LABELER') {
        router.push('/labeler/workspace')
      } else if (role === 'CHECKER') {
        router.push('/checker/workspace')
      }
    } catch (_err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            Label Flow
          </h2>
          <p className="text-center text-base-content/60 mb-4">
            标注任务管理平台
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">邮箱</span>
              </label>
              <input
                type="email"
                placeholder="请输入邮箱"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">密码</span>
              </label>
              <input
                type="password"
                placeholder="请输入密码"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-6">
              <Button
                htmlType="submit"
                type="primary"
                block
                loading={loading}
                loadingText="登录中..."
              >
                登录
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
