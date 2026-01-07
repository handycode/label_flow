import OnFire from '@/lib/events/onfire'

describe('OnFire', () => {
  let eventEmitter: OnFire

  beforeEach(() => {
    eventEmitter = new OnFire('test')
  })

  afterEach(() => {
    eventEmitter.off()
  })

  it('should create an instance with a name', () => {
    expect(eventEmitter.name).toBe('test')
  })

  it('should allow subscribing to events with on()', () => {
    const callback = jest.fn()
    eventEmitter.on('testEvent', callback)

    eventEmitter.emit('testEvent', 'hello')

    expect(callback).toHaveBeenCalledWith('hello')
  })

  it('should allow subscribing to events with once()', () => {
    const callback = jest.fn()
    eventEmitter.once('testEvent', callback)

    eventEmitter.emit('testEvent', 'hello')
    eventEmitter.emit('testEvent', 'world')

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('hello')
  })

  it('should support multiple listeners for the same event', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()

    eventEmitter.on('testEvent', callback1)
    eventEmitter.on('testEvent', callback2)

    eventEmitter.emit('testEvent', 'hello')

    expect(callback1).toHaveBeenCalledWith('hello')
    expect(callback2).toHaveBeenCalledWith('hello')
  })

  it('should remove specific listener with off()', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()

    eventEmitter.on('testEvent', callback1)
    eventEmitter.on('testEvent', callback2)

    eventEmitter.off('testEvent', callback1)
    eventEmitter.emit('testEvent', 'hello')

    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).toHaveBeenCalledWith('hello')
  })

  it('should remove all listeners for an event with off()', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()

    eventEmitter.on('testEvent', callback1)
    eventEmitter.on('testEvent', callback2)

    eventEmitter.off('testEvent')
    eventEmitter.emit('testEvent', 'hello')

    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).not.toHaveBeenCalled()
  })

  it('should handle off() when event has no listeners', () => {
    // This tests the branch: if (!this.es[eventName] || this.es[eventName].length === 0) return
    eventEmitter.off('nonExistentEvent')
    // Should not throw an error
    expect(true).toBe(true)
  })

  it('should handle off() when event exists but has no listeners', () => {
    eventEmitter.off('emptyEvent')
    eventEmitter.fire('emptyEvent')
    // Should not throw an error
    expect(true).toBe(true)
  })

  it('should remove all listeners with off()', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()

    eventEmitter.on('testEvent1', callback1)
    eventEmitter.on('testEvent2', callback2)

    eventEmitter.off()
    eventEmitter.emit('testEvent1', 'hello')
    eventEmitter.emit('testEvent2', 'world')

    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).not.toHaveBeenCalled()
  })

  it('should handle multiple parameters', () => {
    const callback = jest.fn()
    eventEmitter.on('testEvent', callback)

    eventEmitter.emit('testEvent', 'hello', 'world', 42)

    expect(callback).toHaveBeenCalledWith('hello', 'world', 42)
  })

  it('should return the result of the last listener', () => {
    const callback = jest.fn(() => 'result')

    eventEmitter.on('testEvent', callback)

    const result = eventEmitter.emit('testEvent')

    expect(result).toBe('result')
  })

  it('should support fire() as an alias for emit()', () => {
    const callback = jest.fn()
    eventEmitter.on('testEvent', callback)

    eventEmitter.fire('testEvent', 'hello')

    expect(callback).toHaveBeenCalledWith('hello')
  })

  it('should handle off() with specific callback on non-existent event', () => {
    const callback = jest.fn()

    // This should not throw when removing a callback from a non-existent event
    // Tests the branch: const listeners = this.es[eventName] || []
    eventEmitter.off('nonExistentEvent', callback)

    expect(true).toBe(true)
  })
})