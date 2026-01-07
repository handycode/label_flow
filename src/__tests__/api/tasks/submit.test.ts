/**
 * @jest-environment node
 */
import { POST } from '@/app/api/tasks/[id]/submit/route'
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

describe('POST /api/tasks/[id]/submit', () => {
  const mockTask = {
    id: 'task-1',
    status: 'LABELING',
    labelerId: 'labeler-1',
    package: {
      tasks: [],
    },
  }

  const baseTx = {
    annotation: {
      deleteMany: jest.fn(),
      create: jest.fn(),
    },
    taskMetadata: {
      upsert: jest.fn(),
    },
    task: {
      update: jest.fn(),
    },
    operationLog: {
      create: jest.fn(),
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not a labeler', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/tasks/task-1/submit', {
      method: 'POST',
      body: JSON.stringify({
        annotations: [],
        metadata: {},
      }),
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

    const request = new NextRequest('http://localhost/api/tasks/task-1/submit', {
      method: 'POST',
      body: JSON.stringify({
        annotations: [],
        metadata: {},
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Task not found')
  })

  it('should return 403 if user is not the assigned labeler', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-2',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

    const request = new NextRequest('http://localhost/api/tasks/task-1/submit', {
      method: 'POST',
      body: JSON.stringify({
        annotations: [],
        metadata: {},
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('You cannot submit this task')
  })

  it('should return 403 if task is not in LABELING or REJECTED status', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue({
      ...mockTask,
      status: 'APPROVED',
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/submit', {
      method: 'POST',
      body: JSON.stringify({
        annotations: [],
        metadata: {},
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('You cannot submit this task')
  })

  it('should submit annotations successfully', async () => {
    const annotations = [
      {
        type: 'bbox',
        coordinates: { x: 10, y: 20, width: 100, height: 150 },
        label: 'person',
      },
    ]

    const metadata = {
      remarks: 'Test remarks',
    }

    const updatedTask = {
      ...mockTask,
      status: 'LABELED',
      labeledAt: '2024-01-01T00:00:00.000Z',
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      const tx = {
        ...baseTx,
        task: {
          update: jest.fn().mockResolvedValue(updatedTask),
        },
      }
      return callback(tx)
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/submit', {
      method: 'POST',
      body: JSON.stringify({ annotations, metadata }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('LABELED')
  })

  it('should assign to existing checker if available', async () => {
    const taskWithChecker = {
      ...mockTask,
      package: {
        tasks: [{ checkerId: 'checker-1' }],
      },
    }

    const updatedTask = {
      ...mockTask,
      status: 'CHECKING',
      checkerId: 'checker-1',
      labeledAt: '2024-01-01T00:00:00.000Z',
      checkedAt: '2024-01-01T00:00:00.000Z',
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(taskWithChecker)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      const tx = {
        ...baseTx,
        task: {
          update: jest.fn().mockResolvedValue(updatedTask),
        },
      }
      return callback(tx)
    })

    const request = new NextRequest('http://localhost/api/tasks/task-1/submit', {
      method: 'POST',
      body: JSON.stringify({ annotations: [], metadata: {} }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'task-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('CHECKING')
    expect(data.data.checkerId).toBe('checker-1')
  })
})
