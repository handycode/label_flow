/**
 * @jest-environment node
 */
import { POST } from '@/app/api/auth/logout/route'
import { destroySession } from '@/lib/auth'

jest.mock('@/lib/auth', () => ({
  destroySession: jest.fn(),
}))

describe('POST /api/auth/logout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 and success message on successful logout', async () => {
    ;(destroySession as jest.Mock).mockResolvedValue(undefined)

    const response = await POST()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Logged out successfully')
    expect(destroySession).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if destroySession fails', async () => {
    ;(destroySession as jest.Mock).mockRejectedValue(new Error('Session error'))

    const response = await POST()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })
})
