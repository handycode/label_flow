import { TextEncoder } from 'util'
import type { AuthPayload } from '@/types'
import { Role, UserStatus } from '@/types'

const jwtVerifyMock = jest.fn()
const signMock = jest.fn()
let capturedPayload: unknown

jest.mock('jose', () => ({
  jwtVerify: jwtVerifyMock,
  SignJWT: jest.fn().mockImplementation((input) => {
    capturedPayload = input
    return {
      setProtectedHeader: jest.fn().mockReturnThis(),
      setIssuedAt: jest.fn().mockReturnThis(),
      setExpirationTime: jest.fn().mockReturnThis(),
      sign: signMock,
    }
  }),
}))

const payload: AuthPayload = {
  userId: 'user-1',
  username: 'alice',
  email: 'alice@example.com',
  role: Role.ADMIN,
  status: UserStatus.ACTIVE,
}

describe('jwt helpers', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    // Polyfill for Node test environment
    ;(global as any).TextEncoder = TextEncoder
    process.env.JWT_SECRET = 'unit-test-secret'
    signMock.mockResolvedValue('mock-token')
    jwtVerifyMock.mockResolvedValue({ payload })
    capturedPayload = undefined
  })

  it('signs and verifies a token round-trip', async () => {
    const { signToken, verifyToken } = await import('@/lib/auth/jwt')

    const token = await signToken(payload)
    const decoded = await verifyToken(token)

    expect(signMock).toHaveBeenCalled()
    expect(capturedPayload).toMatchObject(payload)
    expect(token).toBe('mock-token')
    expect(decoded).toMatchObject(payload)
  })

  it('returns null for invalid token', async () => {
    jwtVerifyMock.mockRejectedValueOnce(new Error('invalid'))
    const { verifyToken } = await import('@/lib/auth/jwt')

    const decoded = await verifyToken('not-a-real-token')

    expect(decoded).toBeNull()
  })

  it('extracts bearer token from header', async () => {
    const { getTokenFromHeader } = await import('@/lib/auth/jwt')

    expect(getTokenFromHeader('Bearer abc123')).toBe('abc123')
    expect(getTokenFromHeader('Token abc123')).toBeNull()
    expect(getTokenFromHeader(null)).toBeNull()
  })

  it('uses default JWT_SECRET when env var is not set', async () => {
    jest.resetModules()
    delete process.env.JWT_SECRET
    ;(global as any).TextEncoder = TextEncoder
    signMock.mockResolvedValue('default-secret-token')
    jwtVerifyMock.mockResolvedValue({ payload })

    const { signToken } = await import('@/lib/auth/jwt')
    const token = await signToken(payload)

    expect(token).toBe('default-secret-token')
    expect(signMock).toHaveBeenCalled()
  })
})
