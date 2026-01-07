/**
 * @jest-environment node
 */
import { GET } from '@/app/api/statistics/route'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { NextRequest } from 'next/server'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      count: jest.fn(),
      groupBy: jest.fn(),
    },
    user: {
      count: jest.fn(),
    },
    taskPackage: {
      count: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
}))

describe('GET /api/statistics', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    ;(requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = new NextRequest('http://localhost/api/statistics')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return statistics overview', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.task.count as jest.Mock).mockResolvedValue(100)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([
      { status: 'PENDING', _count: { status: 20 } },
      { status: 'LABELING', _count: { status: 15 } },
      { status: 'LABELED', _count: { status: 30 } },
      { status: 'CHECKING', _count: { status: 10 } },
      { status: 'APPROVED', _count: { status: 20 } },
      { status: 'REJECTED', _count: { status: 5 } },
    ])
    ;(prisma.user.count as jest.Mock).mockResolvedValue(50)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(10)

    const request = new NextRequest('http://localhost/api/statistics')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toEqual({
      totalTasks: 100,
      pendingTasks: 20,
      labelingTasks: 15,
      labeledTasks: 30,
      checkingTasks: 10,
      approvedTasks: 20,
      rejectedTasks: 5,
      totalUsers: 50,
      totalPackages: 10,
    })
  })

  it('should handle missing status counts', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.task.count as jest.Mock).mockResolvedValue(10)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([
      { status: 'PENDING', _count: { status: 10 } },
    ])
    ;(prisma.user.count as jest.Mock).mockResolvedValue(5)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(2)

    const request = new NextRequest('http://localhost/api/statistics')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toEqual({
      totalTasks: 10,
      pendingTasks: 10,
      labelingTasks: 0,
      labeledTasks: 0,
      checkingTasks: 0,
      approvedTasks: 0,
      rejectedTasks: 0,
      totalUsers: 5,
      totalPackages: 2,
    })
  })

  it('should return 500 if an unexpected error occurs', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.task.count as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/statistics')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })
})
