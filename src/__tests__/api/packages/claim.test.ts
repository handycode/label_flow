/**
 * @jest-environment node
 */
import { POST } from '@/app/api/packages/[id]/claim/route'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    taskPackage: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
}))

describe('POST /api/packages/[id]/claim', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not authorized', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new Request('http://localhost/api/packages/pkg-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
  })

  it('should return 404 if package not found', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new Request('http://localhost/api/packages/pkg-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('任务包不存在')
  })

  it('should allow labeler to claim package with PENDING tasks', async () => {
    const mockPackage = {
      id: 'pkg-1',
      name: 'Package 1',
    }

    const mockClaimableTasks = [
      { id: 'task-1' },
      { id: 'task-2' },
    ]

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      const tx = {
        task: {
          findMany: jest.fn().mockResolvedValue(mockClaimableTasks),
          updateMany: jest.fn().mockResolvedValue({ count: 2 }),
        },
        taskPackage: {
          update: jest.fn().mockResolvedValue(mockPackage),
        },
        operationLog: {
          createMany: jest.fn().mockResolvedValue({ count: 2 }),
        },
      }
      return callback(tx)
    })

    const request = new Request('http://localhost/api/packages/pkg-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.claimedCount).toBe(2)
    expect(data.data.packageId).toBe('pkg-1')
  })

  it('should return 400 if no claimable tasks', async () => {
    const mockPackage = {
      id: 'pkg-1',
      name: 'Package 1',
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      const tx = {
        task: {
          findMany: jest.fn().mockResolvedValue([]),
          updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        },
        taskPackage: {
          update: jest.fn(),
        },
        operationLog: {
          createMany: jest.fn(),
        },
      }
      return callback(tx)
    })

    const request = new Request('http://localhost/api/packages/pkg-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('该任务包没有可领取的任务')
  })

  it('should allow checker to claim package with LABELED tasks', async () => {
    const mockPackage = {
      id: 'pkg-1',
      name: 'Package 1',
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      const tx = {
        task: {
          findMany: jest.fn().mockResolvedValue([{ id: 'task-1' }, { id: 'task-2' }, { id: 'task-3' }]),
          updateMany: jest.fn().mockResolvedValue({ count: 3 }),
        },
        taskPackage: {
          update: jest.fn().mockResolvedValue(mockPackage),
        },
        operationLog: {
          createMany: jest.fn().mockResolvedValue({ count: 3 }),
        },
      }
      return callback(tx)
    })

    const request = new Request('http://localhost/api/packages/pkg-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.claimedCount).toBe(3)
  })

  it('should handle no claimable tasks for checker', async () => {
    const mockPackage = {
      id: 'pkg-1',
      name: 'Package 1',
    }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      const tx = {
        task: {
          findMany: jest.fn().mockResolvedValue([]),
          updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        },
        taskPackage: {
          update: jest.fn(),
        },
        operationLog: {
          createMany: jest.fn(),
        },
      }
      return callback(tx)
    })

    const request = new Request('http://localhost/api/packages/pkg-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('该任务包没有可质检的任务')
  })

  it('should handle database errors during claim', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue({
      id: 'pkg-1',
      name: 'Package 1',
    })
    ;(prisma.$transaction as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new Request('http://localhost/api/packages/pkg-1/claim', {
      method: 'POST',
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
  })
})
