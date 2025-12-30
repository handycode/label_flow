'use client'

import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'
import toast from '@/components/ui/Toast'
import { Role, RoleName } from '@/types'

interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: string;
  createdAt: string;
  _count: {
    labeledTasks: number;
    checkedTasks: number;
  };
}

const getRoleBadge = (role: string) => {
  const badges: Record<string, string> = {
    ADMIN: 'badge-primary',
    LABELER: 'badge-info',
    CHECKER: 'badge-success',
  }
  return badges[role] || 'badge-ghost'
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 10
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'LABELER',
  })
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    status: '',
  })

  const fetchUsers = async (page: number = 1) => {
    try {
      const res = await fetch(`/api/users?page=${page}&pageSize=${pageSize}`)
      const data = await res.json()
      if (data.success) {
        setUsers(data.data.items)
        setCurrentPage(data.data.page)
        setTotalPages(data.data.totalPages)
        setTotal(data.data.total)
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
        toast.success('用户创建成功')
        setShowCreateModal(false)
        setNewUser({ username: '', email: '', password: '', role: 'LABELER' })
        fetchUsers(currentPage)
      } else {
        toast.error(data.error || '创建用户失败')
      }
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }


  const openEditModal = (user: User) => {
    setEditingUser(user)
    setEditForm({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status,
    })
    setShowEditModal(true)
  }

  const editUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      const updateData: Record<string, unknown> = {}
      if (editForm.username !== editingUser.username) updateData.username = editForm.username
      if (editForm.email !== editingUser.email) updateData.email = editForm.email
      if (editForm.password) updateData.password = editForm.password
      if (editForm.role !== editingUser.role) updateData.role = editForm.role
      if (editForm.status !== editingUser.status) updateData.status = editForm.status

      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('用户信息已更新')
        setShowEditModal(false)
        setEditingUser(null)
        fetchUsers(currentPage)
      } else {
        toast.error(data.error || '更新用户失败')
      }
    } catch (error) {
      console.error('Failed to update user:', error)
      toast.error('更新用户失败')
    }
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
                  <span className={`badge badge-sm ${getRoleBadge(user.role)}`}>
                    {RoleName[user.role]}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-sm ${user.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user._count.labeledTasks}</td>
                <td>{user._count.checkedTasks}</td>
                <td>
                  <button
                    className="btn btn-primary btn-outline btn-sm"
                    onClick={() => openEditModal(user)}
                  >
                    编辑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-base-content/60">
          共 {total} 条记录，每页 {pageSize} 条
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => fetchUsers(page)}
        />
      </div>

      {/* 创建用户 Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">添加用户</h3>
            <form onSubmit={createUser}>
              <div className="form-control mt-4">
                <label className="label w-16">
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
                <label className="label w-16">
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
                <label className="label w-16">
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
                <label className="label w-16">
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

      {/* 编辑用户 Modal */}
      {showEditModal && editingUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">编辑用户</h3>
            <form onSubmit={editUser}>
              <div className="form-control mt-4">
                <label className="label w-16">
                  <span className="label-text">用户名</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label w-16">
                  <span className="label-text">邮箱</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label w-16">
                  <span className="label-text">密码</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={editForm.password}
                  placeholder="留空不修改"
                  onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label w-16">
                  <span className="label-text">角色</span>
                </label>
                <select
                  className="select select-bordered"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                >
                  <option value="LABELER">标注员</option>
                  <option value="CHECKER">质检员</option>
                  <option value="ADMIN">管理员</option>
                </select>
              </div>
              <div className="form-control mt-4">
                <label className="label w-16">
                  <span className="label-text">状态</span>
                </label>
                <select
                  className="select select-bordered"
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  <option value="ACTIVE">激活</option>
                  <option value="INACTIVE">未激活</option>
                  <option value="SUSPENDED">停用</option>
                </select>
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowEditModal(false)}>
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
