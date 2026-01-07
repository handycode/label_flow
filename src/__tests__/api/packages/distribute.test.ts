/**
 * @jest-environment node
 */
import { POST } from '@/app/api/packages/[id]/distribute/route'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    taskPackage: {
      findUnique: jest.fn(),
    },
    mediaResource: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
}))

describe('POST /api/packages/[id]/distribute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/packages/pkg-1/distribute', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should return 404 if package not found', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/packages/pkg-1/distribute', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Package not found')
  })

  it('should distribute all unassigned media', async () => {
    const mockPackage = { id: 'pkg-1', name: 'Package 1' }
    const mockMedia = [
      { id: 'media-1' },
      { id: 'media-2' },
      { id: 'media-3' },
    ]

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue(mockMedia)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        task: {
          createMany: jest.fn().mockResolvedValue({ count: 3 }),
          count: jest.fn().mockResolvedValue(3),
        },
        taskPackage: {
          update: jest.fn().mockResolvedValue({ ...mockPackage, totalCount: 3 }),
        },
      })
    })

    const request = new NextRequest('http://localhost/api/packages/pkg-1/distribute', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.created).toBe(3)
  })

  it('should distribute specific media by IDs', async () => {
    const mockPackage = { id: 'pkg-1', name: 'Package 1' }
    const mockMedia = [{ id: 'media-1' }, { id: 'media-2' }]

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue(mockMedia)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        task: {
          createMany: jest.fn().mockResolvedValue({ count: 2 }),
          count: jest.fn().mockResolvedValue(2),
        },
        taskPackage: {
          update: jest.fn().mockResolvedValue({ ...mockPackage, totalCount: 2 }),
        },
      })
    })

    const request = new NextRequest('http://localhost/api/packages/pkg-1/distribute', {
      method: 'POST',
      body: JSON.stringify({
        mediaIds: ['media-1', 'media-2'],
      }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(prisma.mediaResource.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: { in: ['media-1', 'media-2'] },
          task: null,
        }),
      })
    )
  })

  it('should apply limit to distribution', async () => {
    const mockPackage = { id: 'pkg-1', name: 'Package 1' }
    const mockMedia = [{ id: 'media-1' }, { id: 'media-2' }]

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue(mockMedia)
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        task: {
          createMany: jest.fn().mockResolvedValue({ count: 2 }),
          count: jest.fn().mockResolvedValue(2),
        },
        taskPackage: {
          update: jest.fn().mockResolvedValue({ ...mockPackage, totalCount: 2 }),
        },
      })
    })

    const request = new NextRequest('http://localhost/api/packages/pkg-1/distribute', {
      method: 'POST',
      body: JSON.stringify({ limit: 2 }),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.mediaResource.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 2,
      })
    )
  })

  it('should return 400 if no unassigned media available', async () => {
    const mockPackage = { id: 'pkg-1', name: 'Package 1' }

    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost/api/packages/pkg-1/distribute', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const response = await POST(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('No unassigned media to distribute')
  })
})
