'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  _count: {
    labeledTasks: number;
    checkedTasks: number;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'LABELER',
  })

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      if (data.success) {
        setUsers(data.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      const data = await res.json()
      if (data.success) {
        setShowCreateModal(false)
        setNewUser({ username: '', email: '', password: '', role: 'LABELER' })
        fetchUsers()
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  const getRoleBadge = (role: string) => {
    const badges: Record<string, string> = {
      ADMIN: 'badge-error',
      LABELER: 'badge-info',
      CHECKER: 'badge-success',
    }
    return badges[role] || 'badge-ghost'
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
        <h1 className="text-2xl font-bold">用户管理</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          添加用户
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>用户名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>状态</th>
              <th>标注数</th>
              <th>质检数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user._count.labeledTasks}</td>
                <td>{user._count.checkedTasks}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 创建用户 Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">添加用户</h3>
            <form onSubmit={createUser}>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">用户名</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">邮箱</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">密码</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">角色</span>
                </label>
                <select
                  className="select select-bordered"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="LABELER">标注员</option>
                  <option value="CHECKER">质检员</option>
                  <option value="ADMIN">管理员</option>
                </select>
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowCreateModal(false)}>
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
