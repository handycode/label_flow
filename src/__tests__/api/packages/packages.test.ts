/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/packages/route'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    taskPackage: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
    },
    task: {
      groupBy: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
}))

describe('GET /api/packages', () => {
  const mockPackages = [
    {
      id: 'pkg-1',
      name: 'Package 1',
      status: 'ACTIVE',
      createdBy: { id: 'admin-1', username: 'admin' },
      _count: { tasks: 10 },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not authorized', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/packages')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
  })

  it('should return packages for admin', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockResolvedValue(mockPackages)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(1)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([
      { status: 'PENDING', _count: { status: 5 } },
      { status: 'LABELED', _count: { status: 5 } },
    ])

    const request = new NextRequest('http://localhost/api/packages')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.items).toHaveLength(1)
    expect(data.data.total).toBe(1)
  })

  it('should filter available packages for labeler', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockResolvedValue(mockPackages)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(1)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost/api/packages?filter=available')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          tasks: expect.objectContaining({
            some: expect.objectContaining({
              status: { in: ['PENDING', 'REJECTED'] },
            }),
          }),
        }),
      })
    )
  })

  it('should filter my packages for labeler', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockResolvedValue(mockPackages)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(1)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost/api/packages?filter=my')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          tasks: expect.objectContaining({
            some: expect.objectContaining({
              labelerId: 'labeler-1',
            }),
          }),
        }),
      })
    )
  })

  it('should support pagination', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockResolvedValue(mockPackages)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(25)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost/api/packages?page=2&pageSize=10')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.page).toBe(2)
    expect(data.data.pageSize).toBe(10)
    expect(data.data.totalPages).toBe(3)
    expect(prisma.taskPackage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 10,
        take: 10,
      })
    )
  })

  it('should filter by status', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockResolvedValue(mockPackages)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(1)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost/api/packages?status=ACTIVE')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: 'ACTIVE',
        }),
      })
    )
  })

  it('should filter available packages for checker', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockResolvedValue(mockPackages)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(1)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost/api/packages?filter=available')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          tasks: expect.objectContaining({
            some: expect.objectContaining({
              status: 'LABELED',
            }),
          }),
        }),
      })
    )
  })

  it('should filter my packages for checker', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockResolvedValue(mockPackages)
    ;(prisma.taskPackage.count as jest.Mock).mockResolvedValue(1)
    ;(prisma.task.groupBy as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost/api/packages?filter=my')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          tasks: expect.objectContaining({
            some: expect.objectContaining({
              checkerId: 'checker-1',
            }),
          }),
        }),
      })
    )
  })

  it('should handle database errors', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/packages')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
  })
})

describe('POST /api/packages', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/packages', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test Package' }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
  })

  it('should return 400 if name is missing', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })

    const request = new NextRequest('http://localhost/api/packages', {
      method: 'POST',
      body: JSON.stringify({ description: 'Test Description' }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Package name is required')
  })

  it('should create a package with name only', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })

    const mockPackage = {
      id: 'pkg-1',
      name: 'Test Package',
      description: null,
      createdBy: { id: 'admin-1', username: 'admin' },
      _count: { tasks: 0 },
    }

    ;(prisma.taskPackage.create as jest.Mock).mockResolvedValue(mockPackage)

    const request = new NextRequest('http://localhost/api/packages', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test Package' }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.name).toBe('Test Package')
  })

  it('should create a package with media ids', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })

    const mockPackage = {
      id: 'pkg-1',
      name: 'Test Package',
      description: 'Test Description',
      totalCount: 3,
      createdBy: { id: 'admin-1', username: 'admin' },
      _count: { tasks: 3 },
    }

    ;(prisma.taskPackage.create as jest.Mock).mockResolvedValue(mockPackage)

    const mediaIds = ['media-1', 'media-2', 'media-3']
    const request = new NextRequest('http://localhost/api/packages', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Package',
        description: 'Test Description',
        mediaIds
      }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(prisma.taskPackage.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: 'Test Package',
          description: 'Test Description',
          createdById: 'admin-1',
          totalCount: 3,
          tasks: expect.objectContaining({
            create: expect.arrayContaining([
              expect.objectContaining({ mediaId: 'media-1' }),
              expect.objectContaining({ mediaId: 'media-2' }),
              expect.objectContaining({ mediaId: 'media-3' }),
            ]),
          }),
        }),
      })
    )
  })

  it('should handle database errors on create', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.create as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/packages', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test Package' }),
    })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
  })
})
