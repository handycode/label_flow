/**
 * @jest-environment node
 */
import { GET } from '@/app/api/tasks/[id]/route'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { NextRequest } from 'next/server'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      findUnique: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
}))

describe('GET /api/tasks/[id]', () => {
  const mockTask = {
    id: 'task-1',
    status: 'PENDING',
    media: { id: 'media-1' },
    package: { id: 'pkg-1', name: 'Package 1' },
    labeler: null,
    checker: null,
    annotations: [],
    metadata: {},
    qualityScores: [],
    operationLogs: [],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    ;(requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = new NextRequest('http://localhost/api/tasks/task-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return 404 if task not found', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/tasks/task-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Task not found')
  })

  it('should return task details if found', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toEqual(mockTask)
    expect(prisma.task.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'task-1' },
      })
    )
  })

  it('should return 500 if an unexpected error occurs', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.task.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/tasks/task-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })
})
