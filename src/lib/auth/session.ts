import { cookies } from 'next/headers'
import { signToken, verifyToken } from './jwt'
import type { AuthPayload, Role, SessionUser } from '@/types'

const AUTH_COOKIE_NAME = 'auth_token'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
}

export async function createSession(payload: AuthPayload): Promise<string> {
  const token = await signToken(payload)
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS)
  return token
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  return {
    id: payload.userId,
    username: payload.username,
    email: payload.email,
    role: payload.role as Role,
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireRole(allowedRoles: Role[]): Promise<SessionUser> {
  const session = await requireAuth()
  if (!allowedRoles.includes(session.role)) {
    throw new Error('Forbidden')
  }
  return session
}
