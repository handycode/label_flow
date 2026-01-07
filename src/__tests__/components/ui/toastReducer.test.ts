import { DEFAULT_POSITION, initialState, toastReducer } from '@/components/ui/toastReducer'

describe('toastReducer', () => {
  it('should return the initial state', () => {
    // @ts-expect-error - Testing default case
    expect(toastReducer(initialState, {})).toEqual(initialState)
  })

  it('should handle ADD_TOAST action', () => {
    const toast = {
      id: '1',
      message: 'Test message',
      type: 'show' as const,
      mask: true,
      position: 'tr' as const,
      autoClose: 3000,
    }

    const action = {
      type: 'ADD_TOAST' as const,
      payload: toast,
    }

    const newState = toastReducer(initialState, action)

    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0]).toEqual(toast)
    expect(newState.position).toBe('tr')
    expect(newState.mask).toBe(true)
  })

  it('should handle ADD_TOAST action with default values', () => {
    const toast = {
      id: '1',
      message: 'Test message',
    }

    const action = {
      type: 'ADD_TOAST' as const,
      payload: toast,
    }

    const newState = toastReducer(initialState, action)

    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0]).toMatchObject({
      ...toast,
    })
    // The reducer doesn't actually set default values in the toast object itself
    // It only uses them for the state properties
    expect(newState.position).toBe(DEFAULT_POSITION)
    expect(newState.mask).toBe(false)
  })

  it('should handle REMOVE_TOAST action with id', () => {
    const initialStateWithToasts = {
      ...initialState,
      toasts: [
        { id: '1', message: 'Toast 1' },
        { id: '2', message: 'Toast 2' },
        { id: '3', message: 'Toast 3' },
      ],
    }

    const action = {
      type: 'REMOVE_TOAST' as const,
      payload: '2',
    }

    const newState = toastReducer(initialStateWithToasts, action)

    expect(newState.toasts).toHaveLength(2)
    expect(newState.toasts.find(t => t.id === '2')).toBeUndefined()
    expect(newState.position).toBe(DEFAULT_POSITION)
    expect(newState.mask).toBe(false)
  })

  it('should handle REMOVE_TOAST action without id (clear all)', () => {
    const initialStateWithToasts = {
      ...initialState,
      toasts: [
        { id: '1', message: 'Toast 1' },
        { id: '2', message: 'Toast 2' },
      ],
    }

    const action = {
      type: 'REMOVE_TOAST' as const,
    }

    const newState = toastReducer(initialStateWithToasts, action)

    expect(newState.toasts).toHaveLength(0)
    expect(newState.position).toBe(DEFAULT_POSITION)
    expect(newState.mask).toBe(false)
  })

  it('should handle CLEAR_TOASTS action', () => {
    const initialStateWithToasts = {
      ...initialState,
      toasts: [
        { id: '1', message: 'Toast 1' },
        { id: '2', message: 'Toast 2' },
      ],
    }

    const action = {
      type: 'CLEAR_TOASTS' as const,
    }

    const newState = toastReducer(initialStateWithToasts, action)

    expect(newState.toasts).toHaveLength(0)
  })

  it('should handle SET_MASK action', () => {
    const action = {
      type: 'SET_MASK' as const,
      payload: true,
    }

    const newState = toastReducer(initialState, action)

    expect(newState.mask).toBe(true)
  })

  it('should handle SET_POSITION action with value', () => {
    const action = {
      type: 'SET_POSITION' as const,
      payload: 'bl' as const,
    }

    const newState = toastReducer(initialState, action)

    expect(newState.position).toBe('bl')
  })

  it('should handle SET_POSITION action without value (use default)', () => {
    const action = {
      type: 'SET_POSITION' as const,
    }

    const newState = toastReducer(initialState, action)

    expect(newState.position).toBe(DEFAULT_POSITION)
  })
})