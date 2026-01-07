import type { AuthPayload } from '@/types'
import { Role, UserStatus } from '@/types'

const cookiesMock = jest.fn()
const signTokenMock = jest.fn()
const verifyTokenMock = jest.fn()

jest.mock('next/headers', () => ({
  cookies: cookiesMock,
}))

jest.mock('@/lib/auth/jwt', () => ({
  signToken: signTokenMock,
  verifyToken: verifyTokenMock,
}))

describe('session helpers', () => {
  const payload: AuthPayload = {
    userId: '1',
    username: 'alice',
    email: 'alice@example.com',
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
  }

  let setMock: jest.Mock
  let getMock: jest.Mock
  let deleteMock: jest.Mock
  let store: Map<string, string>
  let sessionModule: typeof import('@/lib/auth/session')

  beforeEach(async () => {
    jest.resetModules()

    store = new Map<string, string>()
    setMock = jest.fn((name: string, value: string) => {
      store.set(name, value)
    })
    getMock = jest.fn((name: string) => {
      return store.has(name) ? { name, value: store.get(name)! } : undefined
    })
    deleteMock = jest.fn((name: string) => {
      store.delete(name)
    })

    cookiesMock.mockResolvedValue({
      set: setMock,
      get: getMock,
      delete: deleteMock,
    })

    signTokenMock.mockResolvedValue('signed-token')
    verifyTokenMock.mockResolvedValue(payload)

    sessionModule = await import('@/lib/auth/session')
  })

  it('creates a session cookie and returns the token', async () => {
    const token = await sessionModule.createSession(payload)

    expect(token).toBe('signed-token')
    expect(setMock).toHaveBeenCalled()
    expect(store.get('auth_token')).toBe('signed-token')
  })

  it('returns session data when token is valid', async () => {
    store.set('auth_token', 'signed-token')

    const session = await sessionModule.getSession()

    expect(session).toMatchObject({
      id: payload.userId,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      status: payload.status,
    })
  })

  it('returns null when no token is present', async () => {
    const session = await sessionModule.getSession()

    expect(session).toBeNull()
  })

  it('returns null when token verification fails', async () => {
    store.set('auth_token', 'invalid')
    verifyTokenMock.mockResolvedValueOnce(null as unknown as AuthPayload)

    const session = await sessionModule.getSession()

    expect(session).toBeNull()
  })

  it('destroys a session cookie', async () => {
    store.set('auth_token', 'signed-token')

    await sessionModule.destroySession()

    expect(deleteMock).toHaveBeenCalledWith('auth_token')
    expect(store.has('auth_token')).toBe(false)
  })

  it('requires authentication', async () => {
    await expect(sessionModule.requireAuth()).rejects.toThrow('Unauthorized')

    store.set('auth_token', 'signed-token')
    const session = await sessionModule.requireAuth()

    expect(session).toBeDefined()
  })

  it('enforces role authorization', async () => {
    store.set('auth_token', 'signed-token')

    // Allowed role
    await expect(sessionModule.requireRole([Role.ADMIN])).resolves.toBeDefined()

    // Forbidden role
    verifyTokenMock.mockResolvedValueOnce({ ...payload, role: Role.LABELER })
    await expect(sessionModule.requireRole([Role.ADMIN])).rejects.toThrow('Forbidden')
  })
})
