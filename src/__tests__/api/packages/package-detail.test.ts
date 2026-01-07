/**
 * @jest-environment node
 */
import { DELETE, GET, PATCH } from '@/app/api/packages/[id]/route'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { Role } from '@/types'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    taskPackage: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  requireRole: jest.fn(),
}))

describe('GET /api/packages/[id]', () => {
  const mockPackage = {
    id: 'pkg-1',
    name: 'Package 1',
    status: 'ACTIVE',
    createdBy: { id: 'admin-1', username: 'admin' },
    tasks: [
      { id: 'task-1', status: 'PENDING', media: {}, labeler: null, checker: null },
      { id: 'task-2', status: 'LABELED', media: {}, labeler: {}, checker: null },
    ],
    _count: { tasks: 2 },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not authorized', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/packages/pkg-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'pkg-1' }) })
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

    const request = new NextRequest('http://localhost/api/packages/pkg-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Package not found')
  })

  it('should return package details for admin', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)

    const request = new NextRequest('http://localhost/api/packages/pkg-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.id).toBe('pkg-1')
    expect(data.data.pendingCount).toBe(1)
    expect(data.data.labeledCount).toBe(1)
  })

  it('should filter tasks by labeler role', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'labeler-1',
      role: Role.LABELER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)

    const request = new NextRequest('http://localhost/api/packages/pkg-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          tasks: expect.objectContaining({
            where: { labelerId: 'labeler-1' },
          }),
        }),
      })
    )
  })

  it('should filter tasks by checker role', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'checker-1',
      role: Role.CHECKER,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockResolvedValue(mockPackage)

    const request = new NextRequest('http://localhost/api/packages/pkg-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          tasks: expect.objectContaining({
            where: { checkerId: 'checker-1' },
          }),
        }),
      })
    )
  })
})

describe('PATCH /api/packages/[id]', () => {
  const mockPackage = {
    id: 'pkg-1',
    name: 'Updated Package',
    description: 'Updated description',
    status: 'COMPLETED',
    createdBy: { id: 'admin-1', username: 'admin' },
    _count: { tasks: 5 },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/packages/pkg-1', {
      method: 'PATCH',
      body: JSON.stringify({ name: 'New Name' }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Forbidden')
  })

  it('should update package successfully', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.update as jest.Mock).mockResolvedValue(mockPackage)

    const request = new NextRequest('http://localhost/api/packages/pkg-1', {
      method: 'PATCH',
      body: JSON.stringify({
        name: 'Updated Package',
        description: 'Updated description',
        status: 'COMPLETED',
      }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toEqual(mockPackage)
  })

  it('should update only provided fields', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.update as jest.Mock).mockResolvedValue(mockPackage)

    const request = new NextRequest('http://localhost/api/packages/pkg-1', {
      method: 'PATCH',
      body: JSON.stringify({ name: 'New Name' }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const _data = await response.json()

    expect(response.status).toBe(200)
    expect(prisma.taskPackage.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { name: 'New Name' },
      })
    )
  })

  it('should handle errors during PATCH', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.update as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/packages/pkg-1', {
      method: 'PATCH',
      body: JSON.stringify({ name: 'New Name' }),
    })
    const response = await PATCH(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
  })

  it('should handle database errors in GET', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/packages/pkg-1')
    const response = await GET(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
  })
})

describe('DELETE /api/packages/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 403 if user is not admin', async () => {
    ;(requireRole as jest.Mock).mockRejectedValue(new Error('Forbidden'))

    const request = new NextRequest('http://localhost/api/packages/pkg-1', {
      method: 'DELETE',
    })
    const response = await DELETE(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.success).toBe(false)
  })

  it('should delete package successfully', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.delete as jest.Mock).mockResolvedValue({ id: 'pkg-1' })

    const request = new NextRequest('http://localhost/api/packages/pkg-1', {
      method: 'DELETE',
    })
    const response = await DELETE(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Package deleted')
  })

  it('should handle errors during DELETE', async () => {
    ;(requireRole as jest.Mock).mockResolvedValue({
      id: 'admin-1',
      role: Role.ADMIN,
    })
    ;(prisma.taskPackage.delete as jest.Mock).mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost/api/packages/pkg-1', {
      method: 'DELETE',
    })
    const response = await DELETE(request, { params: Promise.resolve({ id: 'pkg-1' }) })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
  })
})
