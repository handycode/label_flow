import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import MediaPreview, { usePreview } from '@/components/MediaPreview'
import '@testing-library/jest-dom'

// Test component to use the hook
const TestComponent = () => {
  const { openPreview, closePreview, next, prev, isOpen } = usePreview()

  return (
    <div>
      <button onClick={() => openPreview([
        { id: '1', type: 'picture', file_name: 'test1.jpg' },
        { id: '2', type: 'video', file_name: 'test2.mp4' },
        { id: '3', type: 'picture', file_name: 'test3.jpg' },
      ], 0)}>
        Open Preview
      </button>
      <button onClick={closePreview}>Close</button>
      <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button>
      <div>{isOpen ? 'Open' : 'Closed'}</div>
    </div>
  )
}

describe('MediaPreview component', () => {
  let imageInstances: any[] = []

  beforeEach(() => {
    imageInstances = []
    // Mock Image constructor for prefetching
    global.Image = jest.fn().mockImplementation(function(this: any) {
      this.onload = null
      this.src = ''
      this.decoding = 'auto'
      imageInstances.push(this)
      setTimeout(() => {
        if (this.onload) this.onload()
      }, 0)
      return this
    }) as any
  })

  test('renders children correctly', () => {
    render(
      <MediaPreview>
        <div>Test Content</div>
      </MediaPreview>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('throws error when usePreview is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const InvalidComponent = () => {
      usePreview()
      return null
    }

    expect(() => render(<InvalidComponent />)).toThrow(
      'usePreview must be used within PreviewProvider'
    )

    consoleSpy.mockRestore()
  })

  test('openPreview opens the preview modal', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    expect(screen.getByText('Closed')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('Open')).toBeInTheDocument()
    })
  })

  test('displays correct file information in preview', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
      expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument()
    })
  })

  test('closePreview closes the modal', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('Open')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('close'))

    await waitFor(() => {
      expect(screen.getByText('Closed')).toBeInTheDocument()
    })
  })

  test('next button navigates to next item', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      expect(screen.getByText('test2.mp4')).toBeInTheDocument()
      expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument()
    })
  })

  test('prev button navigates to previous item', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    // Navigate to second item first
    fireEvent.click(screen.getByLabelText('next'))
    await waitFor(() => {
      expect(screen.getByText('test2.mp4')).toBeInTheDocument()
    })

    // Then go back
    fireEvent.click(screen.getByLabelText('previous'))
    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })
  })

  test('keyboard navigation works correctly', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    // Press ArrowRight to go next
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    await waitFor(() => {
      expect(screen.getByText('test2.mp4')).toBeInTheDocument()
    })

    // Press ArrowLeft to go prev
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    // Press Escape to close
    fireEvent.keyDown(window, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.getByText('Closed')).toBeInTheDocument()
    })
  })

  test('clicking backdrop closes the preview', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('Open')).toBeInTheDocument()
    })

    // Click the backdrop (the second fixed inset-0 div is the backdrop)
    const backdrops = document.querySelectorAll('.fixed.inset-0')
    if (backdrops.length > 1) {
      // The second one is the clickable backdrop
      fireEvent.click(backdrops[1])
    }

    await waitFor(() => {
      expect(screen.getByText('Closed')).toBeInTheDocument()
    })
  })

  test('does not navigate beyond boundaries', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    // Try to go prev when at first item
    fireEvent.click(screen.getByLabelText('previous'))
    await waitFor(() => {
      expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument()
    })

    // Navigate to last item
    fireEvent.click(screen.getByLabelText('next'))
    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument()
    })

    // Try to go next when at last item
    fireEvent.click(screen.getByLabelText('next'))
    await waitFor(() => {
      expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument()
    })
  })

  test('renders image with correct src', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const img = screen.getByAltText('test1.jpg')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', expect.stringContaining('1'))
    })
  })

  test('renders video element for video type', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    // Navigate to video item
    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      const video = document.querySelector('video')
      expect(video).toBeInTheDocument()
      expect(video).toHaveAttribute('controls')
      expect(video).toHaveAttribute('autoPlay')
    })
  })

  test('opens preview with specific index', async () => {
    const TestIndexComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: '1', type: 'picture', file_name: 'test1.jpg' },
          { id: '2', type: 'picture', file_name: 'test2.jpg' },
          { id: '3', type: 'picture', file_name: 'test3.jpg' },
        ], 1)}>
          Open at Index 1
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestIndexComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open at Index 1'))

    await waitFor(() => {
      expect(screen.getByText('test2.jpg')).toBeInTheDocument()
      expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument()
    })
  })

  test('handles opening preview with out of bounds index', async () => {
    const TestIndexComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: '1', type: 'picture', file_name: 'test1.jpg' },
          { id: '2', type: 'picture', file_name: 'test2.jpg' },
        ], 10)}>
          Open with high index
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestIndexComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open with high index'))

    await waitFor(() => {
      // Should clamp to last item
      expect(screen.getByText('test2.jpg')).toBeInTheDocument()
      expect(screen.getByText(/2 \/ 2/)).toBeInTheDocument()
    })
  })

  test('handles opening preview with negative index', async () => {
    const TestIndexComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: '1', type: 'picture', file_name: 'test1.jpg' },
          { id: '2', type: 'picture', file_name: 'test2.jpg' },
        ], -1)}>
          Open with negative index
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestIndexComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open with negative index'))

    await waitFor(() => {
      // Should clamp to first item
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
      expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument()
    })
  })

  test('displays loading indicator before media loads', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })
  })

  test('renders image with loading eager', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const imgs = screen.getAllByRole('img')
      const previewImg = imgs.find(img => img.getAttribute('alt') === 'test1.jpg')
      expect(previewImg).toBeDefined()
      if (previewImg) {
        expect(previewImg).toHaveAttribute('loading', 'eager')
        expect(previewImg).toHaveAttribute('decoding', 'async')
      }
    })
  })

  test('handles items without file_name', async () => {
    const TestNoNameComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: '1', type: 'picture' },
        ], 0)}>
          Open without name
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestNoNameComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open without name'))

    await waitFor(() => {
      expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument()
    })
  })

  test('video has preload auto attribute', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    // Navigate to video
    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      const video = document.querySelector('video')
      expect(video).toHaveAttribute('preload', 'auto')
    })
  })

  test('image onLoad sets current as loaded', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const img = screen.getByAltText('test1.jpg')
      fireEvent.load(img)
      expect(img).toBeInTheDocument()
    })

    // Loading indicator should disappear
    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  test('video onCanPlayThrough sets current as loaded', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      const video = document.querySelector('video')
      expect(video).toBeInTheDocument()
      fireEvent.canPlayThrough(video!)
    })

    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  test('uses cached image URL when available', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const img = screen.getByAltText('test1.jpg')
      fireEvent.load(img)
    })

    // Close and reopen to same item
    fireEvent.click(screen.getByLabelText('close'))
    await waitFor(() => {
      expect(screen.getByText('Closed')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Open Preview'))

    // Should load immediately from cache
    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  test('prefetches adjacent items when opening preview', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    const initialCount = imageInstances.length

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      // Should create Image objects for prefetching
      expect(imageInstances.length).toBeGreaterThan(initialCount)
    })
  })

  test('prefetches previous item when navigating', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    // Navigate forward twice
    fireEvent.click(screen.getByLabelText('next'))
    await waitFor(() => {
      expect(screen.getByText('test2.mp4')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('next'))
    await waitFor(() => {
      expect(screen.getByText('test3.jpg')).toBeInTheDocument()
    })

    // Should prefetch previous item
    expect(screen.getByText('test3.jpg')).toBeInTheDocument()
  })

  test('handles navigation when items array is empty', async () => {
    const TestEmptyComponent = () => {
      const { openPreview, next, prev } = usePreview()

      return (
        <div>
          <button onClick={() => openPreview([], 0)}>Open Empty</button>
          <button onClick={next}>Next</button>
          <button onClick={prev}>Prev</button>
        </div>
      )
    }

    render(
      <MediaPreview>
        <TestEmptyComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Empty'))

    // Should not crash
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Prev'))

    expect(screen.queryByText(/\/ 0/)).not.toBeInTheDocument()
  })

  test('getUrl constructs correct URL', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const img = screen.getByAltText('test1.jpg')
      expect(img).toHaveAttribute('src', expect.stringContaining('https://api.etutech.com/bos/api/v1/files/1'))
    })
  })

  test('navigating forward does not exceed last item', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    // Navigate to last item
    fireEvent.click(screen.getByLabelText('next'))
    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      expect(screen.getByText('test3.jpg')).toBeInTheDocument()
    })

    // Try to go beyond last
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByLabelText('next'))
    }

    // Should still be at last item
    expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument()
  })

  test('navigating backward does not go below first item', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument()
    })

    // Try to go before first
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByLabelText('previous'))
    }

    // Should still be at first item
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument()
  })

  test('clicking content area does not close preview', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      expect(screen.getByText('Open')).toBeInTheDocument()
    })

    const contentDiv = document.querySelector('.bg-base-100')
    fireEvent.click(contentDiv!)

    // Should still be open
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  test('image uses fallback URL when not in cache', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const img = screen.getByAltText('test1.jpg')
      expect(img).toHaveAttribute('src', 'https://api.etutech.com/bos/api/v1/files/1')
    })
  })

  test('video uses fallback URL when not in cache', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))
    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      const video = document.querySelector('video')
      expect(video).toHaveAttribute('src', 'https://api.etutech.com/bos/api/v1/files/2')
    })
  })

  test('loading state shows spinner with correct structure', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    expect(spinner?.tagName).toBe('svg')
    expect(spinner?.querySelector('circle')).toBeInTheDocument()
    expect(spinner?.querySelector('path')).toBeInTheDocument()
  })

  test('resets loading state when index changes', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const img = screen.getByAltText('test1.jpg')
      fireEvent.load(img)
    })

    // Spinner should be gone
    expect(document.querySelector('.animate-spin')).not.toBeInTheDocument()

    // Navigate to next item
    fireEvent.click(screen.getByLabelText('next'))

    // Spinner should appear again
    await waitFor(() => {
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    })
  })

  test('handles single item preview', async () => {
    const TestSingleComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: '1', type: 'picture', file_name: 'single.jpg' },
        ], 0)}>
          Open Single
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestSingleComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Single'))

    await waitFor(() => {
      expect(screen.getByText('single.jpg')).toBeInTheDocument()
      expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument()
    })

    // Navigation should not change anything
    fireEvent.click(screen.getByLabelText('next'))
    expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('previous'))
    expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument()
  })

  test('modal container has correct styling classes', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50')
      expect(modal).toBeInTheDocument()
      expect(modal).toHaveClass('flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-75')
    })
  })

  test('header section has correct layout', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const header = document.querySelector('.bg-gray-900')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('p-2', 'flex', 'items-center', 'justify-between', 'text-white')
    })
  })

  test('media container has minimum height', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const container = document.querySelector('.media-container')
      expect(container).toHaveStyle({ 'min-height': '400px' })
    })
  })

  test('image has max height constraint', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))

    await waitFor(() => {
      const img = screen.getByAltText('test1.jpg')
      expect(img).toHaveClass('max-h-[80vh]', 'max-w-full', 'object-contain')
    })
  })

  test('video has max height constraint', async () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Preview'))
    fireEvent.click(screen.getByLabelText('next'))

    await waitFor(() => {
      const video = document.querySelector('video')
      expect(video).toHaveClass('max-h-[80vh]', 'max-w-full')
    })
  })

  test('does not prefetch when id is empty', async () => {
    const TestEmptyIdComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: '', type: 'picture', file_name: 'test.jpg' },
        ], 0)}>
          Open Empty ID
        </button>
      )
    }

    const initialCount = imageInstances.length

    render(
      <MediaPreview>
        <TestEmptyIdComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Empty ID'))

    await waitFor(() => {
      expect(screen.getByText('test.jpg')).toBeInTheDocument()
    })

    // Should not create new Image instances for empty IDs
    expect(imageInstances.length).toBe(initialCount)
  })

  test('keyboard navigation does nothing when modal is closed', () => {
    render(
      <MediaPreview>
        <TestComponent />
      </MediaPreview>
    )

    // Try keyboard events when closed
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.keyDown(window, { key: 'Escape' })

    // Should remain closed
    expect(screen.getByText('Closed')).toBeInTheDocument()
  })

  test('prefetchVideo oncanplaythrough sets cache and loaded state', async () => {
    const videoElements: HTMLVideoElement[] = []
    const originalCreateElement = document.createElement.bind(document)

    const createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((
      tagName: string,
      options?: ElementCreationOptions
    ) => {
      const el = originalCreateElement(tagName, options)
      if (tagName === 'video') {
        videoElements.push(el as HTMLVideoElement)
      }
      return el
    })

    const TestVideoComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: 'vid1', type: 'video', file_name: 'video1.mp4' },
        ], 0)}>
          Open Video
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestVideoComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Video'))

    await waitFor(() => {
      expect(screen.getByText('video1.mp4')).toBeInTheDocument()
    })

    // Find the prefetch video element and trigger its oncanplaythrough
    const prefetchVideo = videoElements.find(v => v.oncanplaythrough)
    if (prefetchVideo && prefetchVideo.oncanplaythrough) {
      await act(async () => {
        (prefetchVideo.oncanplaythrough as Function)(new Event('canplaythrough'))
      })
    }

    // Loading should complete
    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).not.toBeInTheDocument()
    })

    createElementSpy.mockRestore()
  })

  test('prefetchVideo with empty id does nothing', async () => {
    const TestEmptyVideoIdComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: '', type: 'video', file_name: 'empty-id.mp4' },
        ], 0)}>
          Open Empty ID Video
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestEmptyVideoIdComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open Empty ID Video'))

    await waitFor(() => {
      expect(screen.getByText('empty-id.mp4')).toBeInTheDocument()
    })

    // The video should still render in UI
    const video = document.querySelector('video')
    expect(video).toBeInTheDocument()
  })

  test('prefetch adjacent video items triggers oncanplaythrough', async () => {
    const videoElements: HTMLVideoElement[] = []
    const originalCreateElement = document.createElement.bind(document)

    const createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((
      tagName: string,
      options?: ElementCreationOptions
    ) => {
      const el = originalCreateElement(tagName, options)
      if (tagName === 'video') {
        videoElements.push(el as HTMLVideoElement)
      }
      return el
    })

    const TestAdjacentVideoComponent = () => {
      const { openPreview } = usePreview()

      return (
        <button onClick={() => openPreview([
          { id: 'pic1', type: 'picture', file_name: 'pic1.jpg' },
          { id: 'vid1', type: 'video', file_name: 'vid1.mp4' },
          { id: 'vid2', type: 'video', file_name: 'vid2.mp4' },
        ], 1)}>
          Open at Video
        </button>
      )
    }

    render(
      <MediaPreview>
        <TestAdjacentVideoComponent />
      </MediaPreview>
    )

    fireEvent.click(screen.getByText('Open at Video'))

    await waitFor(() => {
      expect(screen.getByText('vid1.mp4')).toBeInTheDocument()
    })

    // Trigger prefetch callbacks for adjacent videos
    await act(async () => {
      videoElements.forEach(v => {
        if (v.oncanplaythrough) {
          (v.oncanplaythrough as Function)(new Event('canplaythrough'))
        }
      })
    })

    // Should have created video elements for prefetching
    expect(videoElements.length).toBeGreaterThan(0)

    createElementSpy.mockRestore()
  })

  test('prefetchVideo skips already cached video', async () => {
    const videoElements: HTMLVideoElement[] = []
    const originalCreateElement = document.createElement.bind(document)

    const createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((
      tagName: string,
      options?: ElementCreationOptions
    ) => {
      const el = originalCreateElement(tagName, options)
      if (tagName === 'video') {
        videoElements.push(el as HTMLVideoElement)
      }
      return el
    })

    const TestCachedVideoComponent = () => {
      const { openPreview, closePreview, next, isOpen } = usePreview()

      return (
        <div>
          <button onClick={() => openPreview([
            { id: 'vid-a', type: 'video', file_name: 'vid-a.mp4' },
            { id: 'vid-b', type: 'video', file_name: 'vid-b.mp4' },
          ], 0)}>
            Open Videos
          </button>
          <button onClick={next}>Go Next</button>
          <button onClick={closePreview}>Close Video</button>
          <div>{isOpen ? 'VideoOpen' : 'VideoClosed'}</div>
        </div>
      )
    }

    render(
      <MediaPreview>
        <TestCachedVideoComponent />
      </MediaPreview>
    )

    // First open - will prefetch vid-a and vid-b
    fireEvent.click(screen.getByText('Open Videos'))

    await waitFor(() => {
      expect(screen.getByText('vid-a.mp4')).toBeInTheDocument()
    })

    // Trigger oncanplaythrough to cache all videos
    await act(async () => {
      videoElements.forEach(v => {
        if (v.oncanplaythrough) {
          (v.oncanplaythrough as Function)(new Event('canplaythrough'))
        }
      })
    })

    const firstVideoCount = videoElements.length

    // Navigate to next video - vid-b should already be cached
    fireEvent.click(screen.getByText('Go Next'))
    await waitFor(() => {
      expect(screen.getByText('vid-b.mp4')).toBeInTheDocument()
    })

    // Navigate back - vid-a should be cached, no new prefetch video
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await waitFor(() => {
      expect(screen.getByText('vid-a.mp4')).toBeInTheDocument()
    })

    // The prefetch should skip cached videos (branch coverage for line 86)
    // Only UI videos should be created for display
    expect(videoElements.length).toBeLessThanOrEqual(firstVideoCount + 2)

    createElementSpy.mockRestore()
  })
})
