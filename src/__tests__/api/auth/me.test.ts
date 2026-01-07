/**
 * @jest-environment node
 */
import { GET } from '@/app/api/auth/me/route'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/auth', () => ({
  getSession: jest.fn(),
}))

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}))

describe('GET /api/auth/me', () => {
  const mockUser = {
    id: 'user-1',
    username: 'testuser',
    email: 'test@example.com',
    role: 'LABELER',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00.000Z',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    ;(getSession as jest.Mock).mockResolvedValue(null)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return 404 if user not found', async () => {
    ;(getSession as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('User not found')
  })

  it('should return 200 and user data if authenticated', async () => {
    ;(getSession as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toEqual(mockUser)
  })

  it('should return 500 if an unexpected error occurs', async () => {
    ;(getSession as jest.Mock).mockRejectedValue(new Error('Database error'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })
})
