import eventBus, { EVENTS } from '@/lib/events/eventBus'

// Mock console.log to avoid console output during tests
console.log = jest.fn()

describe('eventBus', () => {
  afterEach(() => {
    // Clear all event listeners after each test
    eventBus.off()
  })

  it('should be an instance of OnFire', () => {
    expect(eventBus).toBeInstanceOf(eventBus.constructor)
  })

  it('should have a name', () => {
    expect(eventBus.name).toBe('Magnet-Event-Bus')
  })

  it('should have EVENTS object', () => {
    expect(eventBus.events).toBe(EVENTS)
    expect(EVENTS.IMAGE_PREVIEW).toBe('image:preview')
    expect(EVENTS.SHOW_TOAST).toBe('toast:show')
  })

  it('should emit events with predefined event names', () => {
    const callback = jest.fn()
    
    eventBus.on(EVENTS.SHOW_TOAST, callback)
    eventBus.emit(EVENTS.SHOW_TOAST, 'message')
    
    expect(callback).toHaveBeenCalledWith('message')
  })

  it('should handle nested event names', () => {
    const callback = jest.fn()
    
    eventBus.on(EVENTS.media.AUDIO_PLAY, callback)
    eventBus.emit(EVENTS.media.AUDIO_PLAY, 'audio.mp3')
    
    expect(callback).toHaveBeenCalledWith('audio.mp3')
  })

  it('should handle complex nested event names', () => {
    const callback = jest.fn()
    
    eventBus.on(EVENTS.im.MESSAGE_NEW, callback)
    eventBus.emit(EVENTS.im.MESSAGE_NEW, { id: 1, content: 'hello' })
    
    expect(callback).toHaveBeenCalledWith({ id: 1, content: 'hello' })
  })
})