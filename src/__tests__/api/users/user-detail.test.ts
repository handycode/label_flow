/**
 * @jest-environment node
 */
import { DELETE, GET, PATCH } from '@/app/api/users/[id]/route'
import { prisma } from '@/lib/prisma'
import { hashPassword, requireRole } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
  hashPassword: jest.fn(),
}))

describe('GET /api/users/[id]', () => {
  const mockUser = {
    id: 'user-1',
    username: 'testuser',
    email: 'test@example.com',
    role: 'LABELER',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    _count: {
      labeledTasks: 5,
      checkedTasks: 0,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/users/user-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should return 404 if user not found', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/users/user-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('User not found')
  })

  it('should return user details for admin', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

    const request = new NextRequest('http://localhost/api/users/user-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toEqual(mockUser)
  })
})

describe('PATCH /api/users/[id]', () => {
  const mockUser = {
    id: 'user-1',
    username: 'updateduser',
    email: 'updated@example.com',
    role: 'CHECKER',
    status: 'ACTIVE',
    updatedAt: '2024-01-01T00:00:00.000Z',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/users/user-1', {
      method: 'PATCH',
      body: JSON.stringify({ username: 'newname' }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should update user successfully', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.update as jest.Mock).mockResolvedValue(mockUser)

    const request = new NextRequest('http://localhost/api/users/user-1', {
      method: 'PATCH',
      body: JSON.stringify({
        username: 'updateduser',
        email: 'updated@example.com',
        role: 'CHECKER',
      }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toEqual(mockUser)
  })

  it('should hash password if provided', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(hashPassword as jest.Mock).mockResolvedValue('hashed_new_password')
    ;(prisma.user.update as jest.Mock).mockResolvedValue(mockUser)

    const request = new NextRequest('http://localhost/api/users/user-1', {
      method: 'PATCH',
      body: JSON.stringify({
        password: 'newpassword123',
      }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(hashPassword).toHaveBeenCalledWith('newpassword123')
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          passwordHash: 'hashed_new_password',
        }),
      })
    )
  })

  it('should update only provided fields', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.update as jest.Mock).mockResolvedValue(mockUser)

    const request = new NextRequest('http://localhost/api/users/user-1', {
      method: 'PATCH',
      body: JSON.stringify({ status: 'DISABLED' }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { status: 'DISABLED' },
      })
    )
  })
})

describe('DELETE /api/users/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/users/user-1', {
      method: 'DELETE',
    })
    const response = await DELETE(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should delete user successfully', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.delete as jest.Mock).mockResolvedValue({})

    const request = new NextRequest('http://localhost/api/users/user-1', {
      method: 'DELETE',
    })
    const response = await DELETE(request, { params: Promise.resolve({ id: 'user-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('User deleted')
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } })
  })
})
