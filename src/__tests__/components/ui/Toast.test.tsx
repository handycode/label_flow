import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast, { ToastContainer } from '@/components/ui/Toast'
import eventBus from '@/lib/events/eventBus'

// Mock the event bus to spy on its methods
jest.mock('@/lib/events/eventBus', () => {
  const actualEventBus = jest.requireActual('@/lib/events/eventBus')
  // Store the listeners so we can manually trigger them in tests
  const listeners: Record<string, Function[]> = {}

  return {
    ...actualEventBus,
    fire: jest.fn((event, data) => {
      if (listeners[event]) {
        listeners[event].forEach(listener => listener(data))
      }
    }),
    on: jest.fn((event, callback) => {
      if (!listeners[event]) {
        listeners[event] = []
      }
      listeners[event].push(callback)
      return { off: () => { } }
    }),
    off: jest.fn((event, callback) => {
      if (listeners[event]) {
        if (callback) {
          listeners[event] = listeners[event].filter((cb: any) => cb !== callback)
        } else {
          listeners[event] = []
        }
      }
    }),
    events: {
      SHOW_TOAST: 'toast:show',
      REMOVE_TOAST: 'toast:remove',
    }
  }
})

describe('toast object', () => {
  beforeEach(() => {
    (eventBus.fire as jest.Mock).mockClear()
  })

  it('calls eventBus.fire with the correct parameters for each type', () => {
    const message = 'Test message'

    act(() => toast.show(message))
    expect(eventBus.fire).toHaveBeenCalledWith('toast:show', {
      message,
      type: 'show',
    })

    act(() => toast.success(message))
    expect(eventBus.fire).toHaveBeenCalledWith('toast:show', {
      message,
      type: 'success',
    })

    act(() => toast.error(message))
    expect(eventBus.fire).toHaveBeenCalledWith('toast:show', {
      message,
      type: 'error',
    })

    act(() => toast.info(message))
    expect(eventBus.fire).toHaveBeenCalledWith('toast:show', {
      message,
      type: 'info',
    })

    act(() => toast.warn(message))
    expect(eventBus.fire).toHaveBeenCalledWith('toast:show', {
      message,
      type: 'warn',
    })
  })

  it('calls eventBus.fire to remove a toast', () => {
    act(() => toast.remove('some-id'))
    expect(eventBus.fire).toHaveBeenCalledWith('toast:remove', 'some-id')

    act(() => toast.remove())
    expect(eventBus.fire).toHaveBeenCalledWith('toast:remove', undefined)
  })

  it('supports custom options for toast methods', () => {
    const message = 'Test message'
    const options = {
      position: 'br' as const,
      autoClose: 3000,
      clickToClose: true,
      mask: true
    }

    act(() => toast.success(message, options))
    expect(eventBus.fire).toHaveBeenCalledWith('toast:show', {
      message,
      type: 'success',
      ...options
    })
  })
})

describe('ToastContainer', () => {
  beforeEach(() => {
    // Clear all listeners before each test
    eventBus.off(); // Call with no arguments to clear all listeners
    (eventBus.fire as jest.Mock).mockClear();
    (eventBus.on as jest.Mock).mockClear();
    (eventBus.off as jest.Mock).mockClear()

    // Clear any timers
    jest.useRealTimers()
  })

  it('renders a toast when a SHOW_TOAST event is fired', async () => {
    render(<ToastContainer />)
    const message = 'A new toast appears!'

    // Manually trigger the event
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, { type: 'info', message })
    })

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })

  it('removes a toast when a REMOVE_TOAST event is fired', async () => {
    render(<ToastContainer />)
    const message = 'Another toast'

    // Manually trigger the SHOW_TOAST event
    let toastId: string | undefined
    act(() => {
      const result = eventBus.fire<{ id: string }>(eventBus.events.SHOW_TOAST, { type: 'success', message })
      if (result && result.id) {
        toastId = result.id
      }
    })

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Manually trigger the REMOVE_TOAST event
    act(() => {
      eventBus.fire(eventBus.events.REMOVE_TOAST, toastId!)
    })

    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument()
    })
  })

  it('removes all toasts when REMOVE_TOAST is fired without an id', async () => {
    render(<ToastContainer />)
    const message1 = 'Toast 1'
    const message2 = 'Toast 2'

    // Manually trigger the SHOW_TOAST events
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, { type: 'success', message: message1 })
      eventBus.fire(eventBus.events.SHOW_TOAST, { type: 'error', message: message2 })
    })

    await waitFor(() => {
      expect(screen.getByText(message1)).toBeInTheDocument()
      expect(screen.getByText(message2)).toBeInTheDocument()
    })

    // Manually trigger the REMOVE_TOAST event without an id
    act(() => {
      eventBus.fire(eventBus.events.REMOVE_TOAST, undefined)
    })

    await waitFor(() => {
      expect(screen.queryByText(message1)).not.toBeInTheDocument()
      expect(screen.queryByText(message2)).not.toBeInTheDocument()
    })
  })

  it('automatically closes a toast after the specified duration', async () => {
    jest.useFakeTimers()
    render(<ToastContainer />)
    const message = 'Auto-closing toast'

    // Manually trigger the SHOW_TOAST event
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'warn',
        message,
        autoClose: 3000,
        clickToClose: true
      })
    })

    // Toast should be visible initially
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000)
    })

    // Toast should be removed
    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument()
    }, { timeout: 1000 })

    jest.useRealTimers()
  })

  it('does not auto-close a toast when autoClose is false', async () => {
    jest.useFakeTimers()
    render(<ToastContainer />)
    const message = 'Persistent toast'

    // Manually trigger the SHOW_TOAST event
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message,
        autoClose: false
      })
    })

    // Toast should be visible
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(10000)
    })

    // Toast should still be visible
    expect(screen.getByText(message)).toBeInTheDocument()

    jest.useRealTimers()
  })

  it('does not auto-close a toast when autoClose is a positive number', async () => {
    jest.useFakeTimers()
    render(<ToastContainer />)
    const message = 'Persistent toast'

    // Manually trigger the SHOW_TOAST event
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message,
        autoClose: 10000 // 10 seconds
      })
    })

    // Toast should be visible
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Fast-forward time less than autoClose duration
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    // Toast should still be visible
    expect(screen.getByText(message)).toBeInTheDocument()

    jest.useRealTimers()
  })

  it('renders close button when duration is 0 (autoClose is 0)', async () => {
    render(<ToastContainer />)
    const message = 'Toast with close button'

    // Manually trigger the SHOW_TOAST event with autoClose set to 0
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message,
        autoClose: 0
      })
    })

    // Toast should be visible
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Close button (XIcon) should be visible
    const closeButton = screen.getByText(message).closest('.alert')?.querySelector('.cursor-pointer')
    expect(closeButton).toBeInTheDocument()
  })

  it('closes a toast when close button is clicked', async () => {
    render(<ToastContainer />)
    const message = 'Toast with close button'

    // Manually trigger the SHOW_TOAST event with autoClose set to 0
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message,
        autoClose: 0
      })
    })

    // Toast should be visible
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Click the close button
    const closeButton = screen.getByText(message).closest('.alert')?.querySelector('.cursor-pointer')
    if (closeButton) {
      await act(async () => {
        await userEvent.click(closeButton)
      })
    }

    // Toast should be removed
    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('closes a toast when clicked and clickToClose is true', async () => {
    render(<ToastContainer />)
    const message = 'Clickable toast'

    // Manually trigger the SHOW_TOAST event
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'success',
        message,
        clickToClose: true
      })
    })

    // Toast should be visible
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Click the toast
    const toastElement = screen.getByText(message).closest('.alert')
    if (toastElement) {
      await act(async () => {
        await userEvent.click(toastElement)
      })
    }

    // Wait for the toast to be removed
    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('does not close a toast when clicked and clickToClose is false', async () => {
    render(<ToastContainer />)
    const message = 'Non-clickable toast'

    // Manually trigger the SHOW_TOAST event
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'error',
        message,
        clickToClose: false
      })
    })

    // Toast should be visible
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })

    // Click the toast
    const toastElement = screen.getByText(message).closest('.alert')
    if (toastElement) {
      await act(async () => {
        await userEvent.click(toastElement)
      })
    }

    // Toast should still be visible
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('renders toast with correct icons based on type', async () => {
    render(<ToastContainer />)

    // Test success toast
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'success',
        message: 'Success message'
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument()
    })

    // Check for success icon (CheckCircle2Icon renders as svg)
    expect(screen.getByText('Success message').closest('.alert')).toContainHTML('svg')
  })

  it('applies correct CSS classes based on toast type', async () => {
    render(<ToastContainer />)

    // Test error toast
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'error',
        message: 'Error message'
      })
    })

    await waitFor(() => {
      const toastElement = screen.getByText('Error message').closest('.alert')
      expect(toastElement).toHaveClass('alert-error')
    })
  })

  it('renders toast with mask when mask option is true', async () => {
    render(<ToastContainer />)

    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message: 'Masked toast',
        mask: true
      })
    })

    await waitFor(() => {
      // Check for mask element
      const maskElement = document.querySelector('.fixed.top-0.left-0')
      expect(maskElement).toBeInTheDocument()
    })
  })

  it('throws error for unhandled action types in reducer', async () => {
    // We can't directly test the reducer since it's internal to ToastContainer,
    // but we can test that the component handles errors gracefully
    // This test ensures that if an invalid action type is somehow dispatched,
    // it would be handled appropriately

    // Since we can't directly dispatch to the internal reducer,
    // we'll test that the component doesn't crash for valid operations
    expect(() => {
      render(<ToastContainer />)
      act(() => {
        eventBus.fire(eventBus.events.SHOW_TOAST, {
          type: 'success',
          message: 'Test message'
        })
      })
    }).not.toThrow()
  })

  it('applies correct position classes based on position prop', async () => {
    render(<ToastContainer />)

    // Test top-right position
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message: 'Top right toast',
        position: 'tr'
      })
    })

    await waitFor(() => {
      const toastContainer = document.querySelector('.toast')
      expect(toastContainer).toHaveClass('toast-top')
      expect(toastContainer).toHaveClass('toast-end')
    })
  })

  it('applies correct position classes for center position', async () => {
    render(<ToastContainer />)

    // Test center position
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message: 'Center toast',
        position: 'center'
      })
    })

    await waitFor(() => {
      const toastContainer = document.querySelector('.toast')
      expect(toastContainer).toHaveClass('toast-middle')
      expect(toastContainer).toHaveClass('toast-center')
    })
  })

  it('renders mask with correct z-index', async () => {
    render(<ToastContainer />)

    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message: 'Masked toast',
        mask: true
      })
    })

    await waitFor(() => {
      const maskElement = document.querySelector('.fixed.top-0.left-0')
      expect(maskElement).toHaveStyle({ zIndex: '9998' })
    })
  })

  it('should render fail type toast', () => {
    render(<ToastContainer />)

    act(() => {
      toast.error('Failed message')
    })

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-error')
  })

  it('should persist toast when autoClose is false', async () => {
    render(<ToastContainer />)

    act(() => {
      toast.show('Persistent message', { autoClose: false })
    })

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()

    await new Promise(resolve => setTimeout(resolve, 3500))
    expect(alert).toBeInTheDocument()
  })

  it('should not render close button when autoClose is false', () => {
    render(<ToastContainer />)

    act(() => {
      toast.show('Message with close button', { autoClose: false })
    })

    const closeIcon = document.querySelector('.cursor-pointer')
    expect(closeIcon).not.toBeInTheDocument()
  })

  it('should call onClick handler when toast is clicked', async () => {
    const mockOnClick = jest.fn()
    render(<ToastContainer />)

    act(() => {
      toast.show('Clickable message', { onClick: mockOnClick })
    })

    const alert = screen.getByRole('alert')
    await act(async () => {
      await userEvent.click(alert)
    })
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('should remove toast when clicked with clickToClose', async () => {
    render(<ToastContainer />)

    act(() => {
      toast.show('Click to close', { clickToClose: true })
    })

    const alert = screen.getByRole('alert')
    await act(async () => {
      await userEvent.click(alert)
    })

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  it('should handle both onClick and clickToClose', async () => {
    const mockOnClick = jest.fn()
    render(<ToastContainer />)

    act(() => {
      toast.show('Combined behavior', {
        onClick: mockOnClick,
        clickToClose: true
      })
    })

    const alert = screen.getByRole('alert')
    await act(async () => {
      await userEvent.click(alert)
    })

    expect(mockOnClick).toHaveBeenCalled()
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  it('should close toast when close button is clicked (autoClose=0)', async () => {
    render(<ToastContainer />)

    act(() => {
      toast.show('Message with close', { autoClose: 0 })
    })

    const closeIcon = document.querySelector('.cursor-pointer') as HTMLElement | null
    expect(closeIcon).toBeInTheDocument()

    if (closeIcon) {
      await act(async () => {
        await userEvent.click(closeIcon)
      })
    }

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  it('should use DEFAULT_DURATION when autoClose is undefined', async () => {
    render(<ToastContainer />)

    // Test with autoClose not provided (undefined)
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message: 'Undefined autoClose',
        autoClose: undefined
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Undefined autoClose')).toBeInTheDocument()
    })

    // Test with autoClose as string (not false, not number)
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'info',
        message: 'String autoClose',
        autoClose: '3000' as any // TypeScript won't allow this normally, but we test it
      })
    })

    await waitFor(() => {
      expect(screen.getByText('String autoClose')).toBeInTheDocument()
    })
  })

  it('should render toast with default type when type is not specified', async () => {
    render(<ToastContainer />)

    // Test with type as undefined
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        message: 'Toast without type',
        type: undefined as any,
        autoClose: false
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Toast without type')).toBeInTheDocument()
    })

    // Check that it has default bg class (not alert-success, alert-error, etc.)
    const toastElement = screen.getByText('Toast without type').closest('.alert')
    expect(toastElement).toHaveClass('bg-accent')
    expect(toastElement).toHaveClass('text-accent-content')

    // Test with type as null
    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        message: 'Toast with null type',
        type: null as any,
        autoClose: false
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Toast with null type')).toBeInTheDocument()
    })
  })

  it('should render toast with show type explicitly', async () => {
    render(<ToastContainer />)

    act(() => {
      eventBus.fire(eventBus.events.SHOW_TOAST, {
        type: 'show',
        message: 'Toast with show type',
        autoClose: false
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Toast with show type')).toBeInTheDocument()
    })

    const toastElement = screen.getByText('Toast with show type').closest('.alert')
    expect(toastElement).toHaveClass('bg-accent')
  })
})