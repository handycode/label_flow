/**
 * @jest-environment node
 */
import { POST } from '@/app/api/tasks/[id]/review/route'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
}))

describe('POST /api/tasks/[id]/review', () => {
  const mockTask = {
    id: 'task-1',
    status: 'CHECKING',
    checkerId: 'checker-1',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not a checker', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        approved: true,
        score: 5,
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should return 400 if approved field is missing', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        score: 5,
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('approved field is required')
  })

  it('should return 400 if score is invalid', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        approved: true,
        score: 6,
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Score must be between 1 and 5')
  })

  it('should return 404 if task not found', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        approved: true,
        score: 5,
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Task not found')
  })

  it('should return 403 if task is not in CHECKING status', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue({
      ...mockTask,
      status: 'LABELED',
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        approved: true,
        score: 5,
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('You cannot review this task')
  })

  it('should return 403 if user is not the assigned checker', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-2',
      role: Role.CHECKER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        approved: true,
        score: 5,
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('You cannot review this task')
  })

  it('should approve task successfully', async () => {
    const updatedTask = {
      ...mockTask,
      status: 'APPROVED',
      checkedAt: new Date(),
      media: { id: 'media-1' },
      annotations: [],
      qualityScores: [{ score: 5 }],
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        qualityScore: {
          create: jest.fn(),
        },
        taskMetadata: {
          upsert: jest.fn(),
        },
        task: {
          update: jest.fn().mockResolvedValue(updatedTask),
        },
      })
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        approved: true,
        score: 5,
        remarks: 'Good work',
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('APPROVED')
  })

  it('should reject task successfully', async () => {
    const updatedTask = {
      ...mockTask,
      status: 'REJECTED',
      checkedAt: new Date(),
      media: { id: 'media-1' },
      annotations: [],
      qualityScores: [{ score: 2 }],
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        qualityScore: {
          create: jest.fn(),
        },
        taskMetadata: {
          upsert: jest.fn(),
        },
        task: {
          update: jest.fn().mockResolvedValue(updatedTask),
        },
      })
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/review', {
      method: 'POST',
      body: JSON.stringify({
        approved: false,
        score: 2,
        remarks: 'Needs improvement',
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('REJECTED')
  })
})
