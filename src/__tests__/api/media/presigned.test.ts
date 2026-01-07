/**
 * @jest-environment node
 */
import { GET } from '@/app/api/media/presigned/[key]/route'
import { requireAuth } from '@/lib/auth'
import { getPresignedUrl } from '@/lib/s3'
import { NextRequest } from 'next/server'

jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
}))

jest.mock('@/lib/s3', () => ({
  getPresignedUrl: jest.fn(),
}))

describe('GET /api/media/presigned/[key]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    ;(requireAuth as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const request = new NextRequest('http://localhost/api/media/presigned/test.jpg')
    const response = await GET(request, { params: Promise.resolve({ key: 'test.jpg' }) })
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return presigned URL for authenticated user', async () => {
    const mockPresignedUrl = 'https://s3.amazonaws.com/bucket/test.jpg?signature=xyz'
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(getPresignedUrl as jest.Mock).mockResolvedValue(mockPresignedUrl)

    const request = new NextRequest('http://localhost/api/media/presigned/test.jpg')
    const response = await GET(request, { params: Promise.resolve({ key: 'test.jpg' }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.url).toBe(mockPresignedUrl)
    expect(getPresignedUrl).toHaveBeenCalledWith('test.jpg')
  })

  it('should decode URL-encoded keys', async () => {
    const mockPresignedUrl = 'https://s3.amazonaws.com/bucket/test%20file.jpg?signature=xyz'
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(getPresignedUrl as jest.Mock).mockResolvedValue(mockPresignedUrl)

    const encodedKey = encodeURIComponent('test file.jpg')
    const request = new NextRequest(`http://localhost/api/media/presigned/${encodedKey}`)
    const response = await GET(request, { params: Promise.resolve({ key: encodedKey }) })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(getPresignedUrl).toHaveBeenCalledWith('test file.jpg')
  })

  it('should return 500 if S3 operation fails', async () => {
    ;(requireAuth as jest.Mock).mockResolvedValue({ id: 'user-1' })
    ;(getPresignedUrl as jest.Mock).mockRejectedValue(new Error('S3 error'))

    const request = new NextRequest('http://localhost/api/media/presigned/test.jpg')
    const response = await GET(request, { params: Promise.resolve({ key: 'test.jpg' }) })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })
})
