import { hashPassword, verifyPassword } from '@/lib/auth/password'

const plainPassword = 'P@ssw0rd!'

describe('password helpers', () => {
  it('hashes and verifies passwords', async () => {
    const hash = await hashPassword(plainPassword)

    expect(hash).not.toBe(plainPassword)
    expect(await verifyPassword(plainPassword, hash)).toBe(true)
  })

  it('fails verification for wrong password', async () => {
    const hash = await hashPassword(plainPassword)

    expect(await verifyPassword('wrong-password', hash)).toBe(false)
  })
})
