/**
 * @jest-environment node
 */
import { GET } from '@/app/api/tasks/route'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
}))

describe('GET /api/tasks', () => {
  const mockTasks = [
    {
      id: 'task-1',
      status: 'PENDING',
      packageId: 'pkg-1',
      media: { id: 'media-1' },
      package: { id: 'pkg-1', name: 'Package 1' },
      labeler: null,
      checker: null,
      _count: { annotations: 0 },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    ;(requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = new NextRequest('http://localhost/api/tasks')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return tasks for labeler with default filters', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)
    ;(prisma.task.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/tasks')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.items).toEqual(mockTasks)
    expect(data.data.total).toBe(1)
    expect(data.data.page).toBe(1)
  })

  it('should return only user tasks when myTasks=true for labeler', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)
    ;(prisma.task.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/tasks?myTasks=true')
    const response = await GET(request)
    const _data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          labelerId: 'user-1',
        }),
      })
    )
  })

  it('should filter tasks by status', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.ADMIN,
    })
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)
    ;(prisma.task.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/tasks?status=PENDING')
    const response = await GET(request)
    const _data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: 'PENDING',
        }),
      })
    )
  })

  it('should return only user tasks when myTasks=true for checker', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)
    ;(prisma.task.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/tasks?myTasks=true')
    const response = await GET(request)
    const _data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          checkerId: 'user-1',
        }),
      })
    )
  })

  it('should filter checker tasks by LABELED status by default', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)
    ;(prisma.task.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/tasks')
    const response = await GET(request)
    const _data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.arrayContaining([
            expect.objectContaining({ status: 'LABELED' }),
            expect.objectContaining({ checkerId: 'user-1' }),
          ]),
        }),
      })
    )
  })

  it('should filter tasks by packageId', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.ADMIN,
    })
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)
    ;(prisma.task.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/tasks?packageId=pkg-1')
    const response = await GET(request)
    const _data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          packageId: 'pkg-1',
        }),
      })
    )
  })

  it('should support pagination', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.ADMIN,
    })
    ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)
    ;(prisma.task.count as jest.Mock).mockResolvedValue(25)

    const request = new NextRequest('http://localhost/api/tasks?page=2&pageSize=10')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.page).toBe(2)
    expect(data.data.pageSize).toBe(10)
    expect(data.data.totalPages).toBe(3)
    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 10,
        take: 10,
      })
    )
  })

  it('should return 500 if an unexpected error occurs', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({
      id: 'user-1',
      role: Role.ADMIN,
    })
    ;(prisma.task.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/tasks')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })
})
