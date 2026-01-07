/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/users/route'
import { prisma } from '@/lib/prisma'
import { hashPassword, requireRole } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      count: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
  hashPassword: jest.fn(),
}))

describe('GET /api/users', () => {
  const mockUsers = [
    {
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
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/users')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should return users list for admin', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)
    ;(prisma.user.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/users')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.items).toEqual(mockUsers)
    expect(data.data.total).toBe(1)
  })

  it('should filter by role', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)
    ;(prisma.user.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/users?role=LABELER')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          role: 'LABELER',
        }),
      })
    )
  })

  it('should filter by status', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)
    ;(prisma.user.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/users?status=ACTIVE')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: 'ACTIVE',
        }),
      })
    )
  })

  it('should search by username or email', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)
    ;(prisma.user.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/users?search=test')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.arrayContaining([
            { username: { contains: 'test', mode: 'insensitive' } },
            { email: { contains: 'test', mode: 'insensitive' } },
          ]),
        }),
      })
    )
  })

  it('should support pagination', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)
    ;(prisma.user.count as jest.Mock).mockResolvedValue(30)

    const request = new NextRequest('http://localhost/api/users?page=2&pageSize=10')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.page).toBe(2)
    expect(data.data.pageSize).toBe(10)
    expect(data.data.totalPages).toBe(3)
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 10,
        take: 10,
      })
    )
  })
})

describe('POST /api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
  })

  it('should return 400 if required fields are missing', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })

    const request = new NextRequest('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'newuser',
      }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Username, email, and password are required')
  })

  it('should return 409 if user already exists', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findFirst as jest.Mock).mockResolvedValue({
      id: 'existing-user',
      username: 'newuser',
    })

    const request = new NextRequest('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data.success).toBe(false)
  })

  it('should create user successfully', async () => {
    const newUser = {
      id: 'user-new',
      username: 'newuser',
      email: 'new@example.com',
      role: 'LABELER',
      status: 'ACTIVE',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.user.findFirst as jest.Mock).mockResolvedValue(null)
    ;(hashPassword as jest.Mock).mockResolvedValue('hashed_password')
    ;(prisma.user.create as jest.Mock).mockResolvedValue(newUser)

    const request = new NextRequest('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
        role: 'LABELER',
      }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data).toEqual(newUser)
    expect(hashPassword).toHaveBeenCalledWith('password123')
  })
})
