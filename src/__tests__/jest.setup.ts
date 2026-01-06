import '@testing-library/jest-dom'

// Mock uuid to bypass ESM parsing in Jest for node_modules
// Use Node's crypto.randomUUID when available
jest.mock('uuid', () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { randomUUID } = require('crypto')
    return { v4: randomUUID }
  } catch {
    return { v4: () => `${Date.now()}-${Math.random()}-${Math.random()}` }
  }
})