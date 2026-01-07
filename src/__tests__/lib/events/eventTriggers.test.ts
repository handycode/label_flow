describe('eventTriggers', () => {
  let addTrigger: typeof import('@/lib/events/eventTriggers').addTrigger
  let removeTrigger: typeof import('@/lib/events/eventTriggers').removeTrigger
  let getTriggers: typeof import('@/lib/events/eventTriggers').getTriggers
  let fireTriggers: typeof import('@/lib/events/eventTriggers').fireTriggers
  let fireClickTriggers: typeof import('@/lib/events/eventTriggers').fireClickTriggers
  let fireMouseOverTriggers: typeof import('@/lib/events/eventTriggers').fireMouseOverTriggers
  let fireMouseDownTriggers: typeof import('@/lib/events/eventTriggers').fireMouseDownTriggers

  beforeEach(async () => {
    jest.resetModules()
    const eventTriggersModule = await import('@/lib/events/eventTriggers')
    addTrigger = eventTriggersModule.addTrigger
    removeTrigger = eventTriggersModule.removeTrigger
    getTriggers = eventTriggersModule.getTriggers
    fireTriggers = eventTriggersModule.fireTriggers
    fireClickTriggers = eventTriggersModule.fireClickTriggers
    fireMouseOverTriggers = eventTriggersModule.fireMouseOverTriggers
    fireMouseDownTriggers = eventTriggersModule.fireMouseDownTriggers
  })

  it('adds and removes triggers', () => {
    const callback = jest.fn()
    const remove = addTrigger('click', callback)

    expect(getTriggers('click')).toHaveLength(1)

    fireClickTriggers(new MouseEvent('click'))
    expect(callback).toHaveBeenCalledTimes(1)

    remove()
    expect(getTriggers('click')).toHaveLength(0)
  })

  it('fires triggers when selector matches an element', () => {
    const callback = jest.fn()
    addTrigger('click', callback, 'a.cta')

    const element = document.createElement('a')
    element.className = 'cta'
    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', { value: element })

    fireTriggers('click', event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('supports functional selectors and different event types', () => {
    const matchCallback = jest.fn()
    const missCallback = jest.fn()

    addTrigger('mouseover', matchCallback, (e) => (e.target as HTMLElement).id === 'match')
    addTrigger('mouseover', missCallback, (e) => (e.target as HTMLElement).id === 'miss')

    const element = document.createElement('div')
    element.id = 'match'
    const event = new MouseEvent('mouseover')
    Object.defineProperty(event, 'target', { value: element })

    fireMouseOverTriggers(event)

    expect(matchCallback).toHaveBeenCalledTimes(1)
    expect(missCallback).not.toHaveBeenCalled()
  })

  it('fires triggers without selector (unconditional)', () => {
    const callback = jest.fn()
    addTrigger('click', callback)

    const event = new MouseEvent('click')
    fireClickTriggers(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  it('handles removeTrigger when event type does not exist', () => {
    const callback = jest.fn()

    // Should not throw when removing from non-existent type
    expect(() => removeTrigger('click', callback)).not.toThrow()
  })

  it('handles fireTriggers when event type does not exist', () => {
    const event = new MouseEvent('click')

    // Should not throw when firing non-existent type
    expect(() => fireTriggers('click', event)).not.toThrow()
  })

  it('returns empty array from getTriggers when type does not exist', () => {
    expect(getTriggers('click')).toEqual([])
  })

  it('handles null or undefined items in trigger array', () => {
    const callback = jest.fn()
    addTrigger('click', callback)

    // Manually corrupt the array to test edge case
    const triggers = getTriggers('click')
    triggers.push(null as any)
    triggers.push({ trigger: null as any, selector: undefined })

    const event = new MouseEvent('click')

    // Should not throw with null items
    expect(() => fireClickTriggers(event)).not.toThrow()
    expect(callback).toHaveBeenCalled()
  })

  it('matches element by tagName', () => {
    const callback = jest.fn()
    addTrigger('click', callback, 'BUTTON')

    const button = document.createElement('button')
    const event = new MouseEvent('click')
    Object.defineProperty(event, 'target', { value: button })

    fireClickTriggers(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('uses webkitMatchesSelector as fallback', () => {
    const callback = jest.fn()
    addTrigger('click', callback, 'button.primary')

    const button = document.createElement('button')
    button.className = 'primary'

    // Mock scenario where matches doesn't exist but webkitMatchesSelector does
    const originalMatches = button.matches
    const webkitMock = jest.fn().mockReturnValue(true)

    Object.defineProperty(button, 'matches', {
      get: () => undefined,
      configurable: true
    })
    Object.defineProperty(button, 'webkitMatchesSelector', {
      value: webkitMock,
      configurable: true
    })

    const event = new MouseEvent('click')
    Object.defineProperty(event, 'target', { value: button })

    fireClickTriggers(event)

    expect(webkitMock).toHaveBeenCalledWith('button.primary')
    expect(callback).toHaveBeenCalledTimes(1)

    // Restore
    Object.defineProperty(button, 'matches', {
      value: originalMatches,
      configurable: true
    })
  })

  it('supports fireMouseDownTriggers', () => {
    const callback = jest.fn()

    addTrigger('mousedown', callback)

    const mousedownEvent = new MouseEvent('mousedown')
    fireMouseDownTriggers(mousedownEvent)

    expect(callback).toHaveBeenCalledWith(mousedownEvent)
  })

  it('does not fire callback when selector does not match', () => {
    const callback = jest.fn()
    addTrigger('click', callback, 'button.submit')

    const div = document.createElement('div')
    div.className = 'other'
    const event = new MouseEvent('click')
    Object.defineProperty(event, 'target', { value: div })

    fireClickTriggers(event)

    expect(callback).not.toHaveBeenCalled()
  })

  it('allows direct removeTrigger call', () => {
    const callback = jest.fn()
    addTrigger('click', callback)

    expect(getTriggers('click')).toHaveLength(1)

    removeTrigger('click', callback)

    expect(getTriggers('click')).toHaveLength(0)
  })
})
