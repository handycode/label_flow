/**
 * @jest-environment node
 */
import { POST } from '@/app/api/tasks/[id]/claim/route'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
}))

describe('POST /api/tasks/[id]/claim', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not authorized', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/tasks/task-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should return 404 if task not found', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/tasks/task-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Task not found')
  })

  it('should allow labeler to claim PENDING task', async () => {
    const mockTask = {
      id: 'task-1',
      status: 'PENDING',
      labelerId: null,
    }

    const updatedTask = {
      ...mockTask,
      status: 'LABELING',
      labelerId: 'labeler-1',
      assignedAt: new Date(),
      media: { id: 'media-1' },
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)
    ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('LABELING')
    expect(data.data.labelerId).toBe('labeler-1')
  })

  it('should allow labeler to claim REJECTED task', async () => {
    const mockTask = {
      id: 'task-1',
      status: 'REJECTED',
      labelerId: 'labeler-1',
    }

    const updatedTask = {
      ...mockTask,
      status: 'LABELING',
      media: { id: 'media-1' },
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)
    ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('LABELING')
  })

  it('should return 400 if labeler tries to claim non-available task', async () => {
    const mockTask = {
      id: 'task-1',
      status: 'LABELED',
      labelerId: 'labeler-1',
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Task is not available for labeling')
  })

  it('should allow checker to claim LABELED task', async () => {
    const mockTask = {
      id: 'task-1',
      status: 'LABELED',
      checkerId: null,
    }

    const updatedTask = {
      ...mockTask,
      status: 'CHECKING',
      checkerId: 'checker-1',
      media: { id: 'media-1' },
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)
    ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('CHECKING')
    expect(data.data.checkerId).toBe('checker-1')
  })

  it('should return 400 if checker tries to claim non-LABELED task', async () => {
    const mockTask = {
      id: 'task-1',
      status: 'PENDING',
      checkerId: null,
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Task is not available for checking')
  })
})
