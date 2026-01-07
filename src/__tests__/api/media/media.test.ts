/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/media/route'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { listS3Objects } from '@/lib/s3'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    mediaResource: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
}))

jest.mock('@/lib/s3', () => ({
  listS3Objects: jest.fn(),
}))

describe('GET /api/media', () => {
  const mockMedia = [
    {
      id: 'media-1',
      s3Key: 'images/test.jpg',
      type: 'IMAGE',
      autoNumber: 1,
      task: null,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/media')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should return media list for admin', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue(mockMedia)
    ;(prisma.mediaResource.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/media')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.items).toEqual(mockMedia)
    expect(data.data.total).toBe(1)
  })

  it('should filter by type', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue(mockMedia)
    ;(prisma.mediaResource.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/media?type=IMAGE')
    const response = await GET(request)
    await response.json()

    expect(response.status).toBe(200)
    expect(prisma.mediaResource.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          type: 'IMAGE',
        }),
      })
    )
  })

  it('should filter unassigned media', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue(mockMedia)
    ;(prisma.mediaResource.count as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost/api/media?unassigned=true')
    const response = await GET(request)
    await response.json()

    expect(response.status).toBe(200)
    expect(prisma.mediaResource.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          task: null,
        }),
      })
    )
  })

  it('should support pagination', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.mediaResource.findMany as jest.Mock).mockResolvedValue(mockMedia)
    ;(prisma.mediaResource.count as jest.Mock).mockResolvedValue(50)

    const request = new NextRequest('http://localhost/api/media?page=2&pageSize=20')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.page).toBe(2)
    expect(data.data.pageSize).toBe(20)
    expect(data.data.totalPages).toBe(3)
  })
})

describe('POST /api/media/sync', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/media', {
      method: 'POST',
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should sync S3 objects to database', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(listS3Objects as jest.Mock).mockResolvedValue({
      objects: [
        { key: 'images/new.jpg', size: 1024, lastModified: new Date() },
      ],
      continuationToken: null,
    })
    ;(prisma.mediaResource.count as jest.Mock).mockResolvedValue(0)
    ;(prisma.mediaResource.findUnique as jest.Mock).mockResolvedValue(null)
    ;(prisma.mediaResource.create as jest.Mock).mockResolvedValue({})

    const request = new NextRequest('http://localhost/api/media', {
      method: 'POST',
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.created).toBe(1)
  })

  it('should skip existing media', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(listS3Objects as jest.Mock).mockResolvedValue({
      objects: [
        { key: 'images/existing.jpg', size: 1024, lastModified: new Date() },
      ],
      continuationToken: null,
    })
    ;(prisma.mediaResource.count as jest.Mock).mockResolvedValue(1)
    ;(prisma.mediaResource.findUnique as jest.Mock).mockResolvedValue({
      id: 'media-1',
      s3Key: 'images/existing.jpg',
    })

    const request = new NextRequest('http://localhost/api/media', {
      method: 'POST',
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.created).toBe(0)
  })

  it('should handle no new objects', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(listS3Objects as jest.Mock).mockResolvedValue({
      objects: [],
      continuationToken: null,
    })
    ;(prisma.mediaResource.count as jest.Mock).mockResolvedValue(10)

    const request = new NextRequest('http://localhost/api/media', {
      method: 'POST',
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.message).toBe('所有文件已同步完成')
  })
})
