import '@testing-library/jest-dom'
// Polyfill Web APIs for Next.js API route tests in Node environment
import { TextDecoder, TextEncoder } from 'util'
import { ReadableStream } from 'stream/web'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Polyfill fetch APIs for Next.js
if (typeof ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as any
}

// Polyfill DOM events for jsdom environment (for eventTriggers tests)
if (typeof global.MouseEvent === 'undefined' && typeof window !== 'undefined') {
  global.MouseEvent = window.MouseEvent as any
}

if (typeof global.Event === 'undefined' && typeof window !== 'undefined') {
  global.Event = window.Event as any
}

if (typeof global.document === 'undefined' && typeof window !== 'undefined') {
  global.document = window.document as any
}


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