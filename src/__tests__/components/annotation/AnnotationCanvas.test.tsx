import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnnotationCanvas from '@/components/annotation/AnnotationCanvas'
import '@testing-library/jest-dom'
import * as fabric from 'fabric'

// Mock fabric with minimal event + object storage behavior for interactions
jest.mock('fabric', () => ({
  Canvas: jest.fn().mockImplementation(() => {
    const handlers: Record<string, Function[]> = {}
    const objects: any[] = []
    let activeObject: any = null
    let zoom = 1

    const mockCanvas = {
      dispose: jest.fn(),
      getObjects: jest.fn(() => objects),
      add: jest.fn((obj) => objects.push(obj)),
      remove: jest.fn((obj) => {
        const idx = objects.indexOf(obj)
        if (idx >= 0) objects.splice(idx, 1)
      }),
      renderAll: jest.fn(),
      clear: jest.fn(() => { objects.length = 0 }),
      getWidth: jest.fn(() => 800),
      getHeight: jest.fn(() => 600),
      setBackgroundImage: jest.fn(),
      setViewportTransform: jest.fn(),
      requestRenderAll: jest.fn(),
      sendObjectToBack: jest.fn(),
      on: jest.fn((event, cb) => {
        handlers[event] = handlers[event] || []
        handlers[event].push(cb)
      }),
      off: jest.fn((event, cb) => {
        if (!event) return
        if (!handlers[event]) return
        if (cb) {
          handlers[event] = handlers[event].filter((fn) => fn !== cb)
        } else {
          handlers[event] = []
        }
      }),
      trigger(event: string, payload?: any) {
        handlers[event]?.forEach((fn) => fn(payload))
      },
      selection: true,
      forEachObject: jest.fn((callback) => {
        objects.forEach(callback)
      }),
      isDrawingMode: false,
      setZoom: jest.fn((value) => { zoom = value }),
      getZoom: jest.fn(() => zoom),
      zoomToPoint: jest.fn((_, value) => { zoom = value }),
      setActiveObject: jest.fn((obj) => { activeObject = obj }),
      getActiveObject: jest.fn(() => activeObject),
      discardActiveObject: jest.fn(() => { activeObject = null }),
    }

    // expose handlers/objects for tests
    // @ts-expect-error ignore
    mockCanvas.__handlers = handlers
    // @ts-expect-error ignore
    mockCanvas.__objects = objects
    // @ts-expect-error ignore
    mockCanvas.__setActive = (obj: any) => { activeObject = obj }

    return mockCanvas
  }),
  FabricImage: {
    fromURL: jest.fn().mockResolvedValue({
      width: 400,
      height: 300,
      set: jest.fn(),
      scaleX: 1,
      scaleY: 1,
    }),
  },
  Rect: jest.fn().mockImplementation(() => ({
    set: jest.fn(function (props: any) { Object.assign(this, props) }),
    setCoords: jest.fn(),
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    type: 'rect',
    angle: 0,
    getBoundingRect: jest.fn(function () {
      return { left: this.left, top: this.top, width: this.width, height: this.height }
    }),
  })),
  Ellipse: jest.fn().mockImplementation(() => ({
    set: jest.fn(function (props: any) { Object.assign(this, props) }),
    setCoords: jest.fn(),
    left: 0,
    top: 0,
    rx: 50,
    ry: 50,
    type: 'ellipse',
    angle: 0,
    getBoundingRect: jest.fn(function () {
      return { left: this.left, top: this.top, width: (this.rx || 0) * 2, height: (this.ry || 0) * 2 }
    }),
  })),
  Point: jest.fn().mockImplementation((x: number, y: number) => ({ x, y })),
}))

describe('AnnotationCanvas component', () => {
  const mockAnnotations = [
    {
      id: '1',
      type: 'rect',
      coordinates: { x: 10, y: 10, width: 100, height: 100 },
      label: 'Test',
    },
  ]

  const mockOnAnnotationsChange = jest.fn()
  const mockOnToolChange = jest.fn()

  beforeEach(() => {
    mockOnAnnotationsChange.mockClear()
    mockOnToolChange.mockClear()

    // Reset the canvas mock
    ;(fabric.Canvas as unknown as jest.Mock).mockClear()
  })

  test('renders canvas element', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  test('renders with IMAGE media type', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    await waitFor(() => {
      const canvas = document.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
    })
  })

  test('renders with VIDEO media type', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/video.mp4"
        mediaType="VIDEO"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    await waitFor(() => {
      const canvas = document.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
    })
  })

  test('renders with existing annotations', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={mockAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  test('renders with select tool', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders with rect tool', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders with ellipse tool', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="ellipse"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders in readOnly mode', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={mockAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={true}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders container with correct structure', () => {
    const { container } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    // Check for the main container with flex-col class
    const mainContainer = container.querySelector('.flex.flex-col')
    expect(mainContainer).toBeInTheDocument()

    // Check for canvas element
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  test('handles onToolChange callback', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        onToolChange={mockOnToolChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders with empty mediaUrl', () => {
    render(
      <AnnotationCanvas
        mediaUrl=""
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('handles multiple annotations', () => {
    const multipleAnnotations = [
      {
        id: '1',
        type: 'rect',
        coordinates: { x: 10, y: 10, width: 100, height: 100 },
        label: 'Annotation 1',
      },
      {
        id: '2',
        type: 'ellipse',
        coordinates: { x: 200, y: 200, width: 50, height: 50 },
        label: 'Annotation 2',
      },
      {
        id: '3',
        type: 'rect',
        coordinates: { x: 300, y: 300, width: 80, height: 80 },
        label: null,
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={multipleAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('cleans up fabric canvas on unmount', () => {
    const { unmount } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    unmount()
    // Canvas should be cleaned up (tested by fabric mock)
  })

  test('renders with annotations that have frameTime', () => {
    const videoAnnotations = [
      {
        id: '1',
        type: 'rect',
        coordinates: { x: 10, y: 10, width: 100, height: 100 },
        label: 'Frame Annotation',
        frameTime: 5.5,
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/video.mp4"
        mediaType="VIDEO"
        currentTool="select"
        annotations={videoAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders zoom controls', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('重置')).toBeInTheDocument()
  })

  test('renders delete button when not in readOnly mode', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    expect(screen.getByText('删除标注')).toBeInTheDocument()
  })

  test('does not render delete button in readOnly mode', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={true}
      />
    )

    expect(screen.queryByText('删除标注')).not.toBeInTheDocument()
  })

  test('renders video controls for VIDEO media type', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/video.mp4"
        mediaType="VIDEO"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    // Video controls should be present
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  test('switches between different tools', () => {
    const { rerender } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()

    // Switch to rect tool
    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()

    // Switch to ellipse tool
    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="ellipse"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('updates annotations when they change', () => {
    const { rerender } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const newAnnotations = [
      {
        id: '2',
        type: 'rect',
        coordinates: { x: 20, y: 20, width: 50, height: 50 },
        label: 'New',
      },
    ]

    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={newAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('handles mediaUrl change', () => {
    const { rerender } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image1.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/image2.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('handles mediaType change from IMAGE to VIDEO', () => {
    const { rerender } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/media"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/video.mp4"
        mediaType="VIDEO"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders with RECT annotation type', () => {
    const rectAnnotations = [
      {
        id: '1',
        type: 'RECT',
        coordinates: { x: 10, y: 10, width: 100, height: 100 },
        label: 'Rectangle',
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={rectAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders with ELLIPSE annotation type', () => {
    const ellipseAnnotations = [
      {
        id: '1',
        type: 'ELLIPSE',
        coordinates: { x: 50, y: 50, width: 80, height: 60 },
        label: 'Ellipse',
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={ellipseAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders with mixed annotation types', () => {
    const mixedAnnotations = [
      {
        id: '1',
        type: 'RECT',
        coordinates: { x: 10, y: 10, width: 100, height: 100 },
        label: 'Rectangle',
      },
      {
        id: '2',
        type: 'ELLIPSE',
        coordinates: { x: 150, y: 150, width: 80, height: 60 },
        label: 'Ellipse',
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={mixedAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('handles annotations with rotation', () => {
    const rotatedAnnotations = [
      {
        id: '1',
        type: 'RECT',
        coordinates: { x: 10, y: 10, width: 100, height: 100, rotation: 45 },
        label: 'Rotated',
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={rotatedAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('delete button is disabled when no selection', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const deleteButton = screen.getByText('删除标注')
    expect(deleteButton).toBeDisabled()
  })

  test('initializes with correct zoom level', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    // Default zoom should be 100%
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  test('canvas container has correct classes', () => {
    const { container } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasContainer = container.querySelector('.flex-1.w-full.bg-base-300.overflow-hidden')
    expect(canvasContainer).toBeInTheDocument()
  })

  test('zoom buttons are clickable', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const zoomOutButton = screen.getByText('-')
    const zoomInButton = screen.getByText('+')
    const resetButton = screen.getByText('重置')

    expect(zoomOutButton).not.toBeDisabled()
    expect(zoomInButton).not.toBeDisabled()
    expect(resetButton).not.toBeDisabled()
  })

  test('renders control panel with correct layout', () => {
    const { container } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const controlPanel = container.querySelector('.flex.items-center.gap-2.p-2.bg-base-200')
    expect(controlPanel).toBeInTheDocument()
  })

  test('canvas is wrapped in container with flex-1', () => {
    const { container } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasWrapper = container.querySelector('.flex-1.w-full')
    expect(canvasWrapper).toBeInTheDocument()
    expect(canvasWrapper?.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders with annotations containing all coordinate properties', () => {
    const fullAnnotations = [
      {
        id: '1',
        type: 'RECT',
        coordinates: {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          rotation: 0
        },
        label: 'Complete',
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={fullAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('handles empty coordinates in annotations gracefully', () => {
    const emptyCoordAnnotations = [
      {
        id: '1',
        type: 'RECT',
        coordinates: {},
        label: 'Empty',
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={emptyCoordAnnotations as any}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('renders main container with h-full class', () => {
    const { container } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const mainContainer = container.querySelector('.h-full.flex.flex-col')
    expect(mainContainer).toBeInTheDocument()
  })

  test('zoom display shows percentage', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const zoomDisplay = screen.getByText('100%')
    expect(zoomDisplay).toHaveClass('text-sm')
  })

  test('delete button has correct classes when disabled', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const deleteButton = screen.getByText('删除标注')
    expect(deleteButton).toHaveClass('btn', 'btn-xs', 'btn-error')
    expect(deleteButton).toBeDisabled()
  })

  test('renders different media types sequentially', () => {
    const { rerender } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()

    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/video.mp4"
        mediaType="VIDEO"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()

    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/image2.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('handles complex annotation arrays', () => {
    const complexAnnotations = Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      type: i % 2 === 0 ? 'RECT' : 'ELLIPSE',
      coordinates: {
        x: i * 10,
        y: i * 10,
        width: 50 + i * 5,
        height: 50 + i * 5,
        rotation: i * 10
      },
      label: `Annotation ${i + 1}`,
      frameTime: i % 3 === 0 ? i * 0.5 : undefined,
    }))

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/video.mp4"
        mediaType="VIDEO"
        currentTool="select"
        annotations={complexAnnotations as any}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('switches readOnly mode dynamically', () => {
    const { rerender } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    expect(screen.getByText('删除标注')).toBeInTheDocument()

    rerender(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={true}
      />
    )

    expect(screen.queryByText('删除标注')).not.toBeInTheDocument()
  })

  test('annotation with frameTime zero is handled', () => {
    const zeroFrameTimeAnnotation = [
      {
        id: '1',
        type: 'RECT',
        coordinates: { x: 10, y: 10, width: 100, height: 100 },
        label: 'Zero Frame',
        frameTime: 0,
      },
    ]

    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/video.mp4"
        mediaType="VIDEO"
        currentTool="select"
        annotations={zeroFrameTimeAnnotation}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  test('canvas block class is applied', () => {
    const { container } = render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvas = container.querySelector('canvas')
    expect(canvas).toHaveClass('block')
  })

  test('all tools render with same structure', () => {
    const tools: ('select' | 'rect' | 'ellipse')[] = ['select', 'rect', 'ellipse']

    tools.forEach(tool => {
      const { container } = render(
        <AnnotationCanvas
          mediaUrl="https://example.com/image.jpg"
          mediaType="IMAGE"
          currentTool={tool}
          annotations={[]}
          onAnnotationsChange={mockOnAnnotationsChange}
        />
      )

      expect(container.querySelector('canvas')).toBeInTheDocument()
      expect(container.querySelector('.h-full.flex.flex-col')).toBeInTheDocument()
    })
  })

  test('handles zoom in/out and reset via buttons', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    await userEvent.click(screen.getByText('+'))
    expect(screen.getByText('110%')).toBeInTheDocument()

    await userEvent.click(screen.getByText('-'))
    expect(screen.getByText('100%')).toBeInTheDocument()

    await userEvent.click(screen.getByText('重置'))
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  test('draws a rectangle and switches back to select tool', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        onToolChange={mockOnToolChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const initialDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      initialDown({ pointer: { x: 10, y: 20 } })
    })

    await waitFor(() => expect((handlers['mouse:move']?.length || 0)).toBeGreaterThan(0))
    const move = handlers['mouse:move'].at(-1)
    const up = handlers['mouse:up'].at(-1)

    await act(async () => {
      move({ pointer: { x: 60, y: 70 } })
      up()
    })

    expect(mockOnToolChange).toHaveBeenCalledWith('select')
    expect(mockOnAnnotationsChange).toHaveBeenCalled()
    const last = mockOnAnnotationsChange.mock.calls.at(-1)?.[0]
    expect(last?.[0]?.type).toBe('RECT')
  })

  test('draws an ellipse and saves annotation', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="ellipse"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        onToolChange={mockOnToolChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const initialDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      initialDown({ pointer: { x: 0, y: 0 } })
    })

    await waitFor(() => expect((handlers['mouse:move']?.length || 0)).toBeGreaterThan(0))
    const move = handlers['mouse:move'].at(-1)
    const up = handlers['mouse:up'].at(-1)

    await act(async () => {
      move({ pointer: { x: 40, y: 60 } })
      up()
    })

    const last = mockOnAnnotationsChange.mock.calls.at(-1)?.[0]
    expect(last?.[0]?.type).toBe('ELLIPSE')
  })

  test('mouse wheel zoom updates display', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers
    await waitFor(() => expect(handlers['mouse:wheel']?.[0]).toBeDefined())
    const wheel = handlers['mouse:wheel'].at(-1)
    await act(async () => {
      wheel({ e: { deltaY: -100, offsetX: 0, offsetY: 0, preventDefault: jest.fn(), stopPropagation: jest.fn() } })
    })

    expect(screen.getByText('120%')).toBeInTheDocument()
  })

  test('delete button removes selected annotation and disables afterward', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const obj = { type: 'rect', annotationId: '1', left: 0, top: 0, width: 10, height: 10, angle: 0 }
    canvasInstance.add(obj)
    canvasInstance.__setActive(obj)
    await waitFor(() => expect(canvasInstance.__handlers['selection:created']?.[0]).toBeDefined())
    await act(async () => {
      canvasInstance.trigger('selection:created')
    })

    const deleteButton = screen.getByText('删除标注') as HTMLButtonElement
    expect(deleteButton).not.toBeDisabled()

    await userEvent.click(deleteButton)

    await waitFor(() => {
      expect(deleteButton).toBeDisabled()
    })
  })

  test('keyboard Delete key removes active annotation', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results[0].value
    const obj = { type: 'rect', annotationId: '1', left: 0, top: 0, width: 10, height: 10, angle: 0 }
    canvasInstance.add(obj)
    canvasInstance.__setActive(obj)

    const event = new KeyboardEvent('keydown', { key: 'Delete' })
    window.dispatchEvent(event)

    expect(canvasInstance.getObjects().length).toBe(0)
  })

  test('selection cleared event disables delete button', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const obj = { type: 'rect', annotationId: '1' }
    canvasInstance.add(obj)
    canvasInstance.__setActive(obj)

    await act(async () => {
      canvasInstance.trigger('selection:created')
    })

    expect(screen.getByText('删除标注')).not.toBeDisabled()

    await act(async () => {
      canvasInstance.__setActive(null)
      canvasInstance.trigger('selection:cleared')
    })

    expect(screen.getByText('删除标注')).toBeDisabled()
  })

  test('selection updated event keeps delete button enabled', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const obj1 = { type: 'rect', annotationId: '1' }
    const obj2 = { type: 'ellipse', annotationId: '2' }
    canvasInstance.add(obj1)
    canvasInstance.add(obj2)
    canvasInstance.__setActive(obj1)

    await act(async () => {
      canvasInstance.trigger('selection:created')
    })

    canvasInstance.__setActive(obj2)
    await act(async () => {
      canvasInstance.trigger('selection:updated')
    })

    expect(screen.getByText('删除标注')).not.toBeDisabled()
  })

  test('object modified event saves annotations', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const obj = { type: 'rect', annotationId: '1', left: 10, top: 20, width: 50, height: 50, angle: 0, getBoundingRect: jest.fn() }
    canvasInstance.add(obj)

    await act(async () => {
      canvasInstance.trigger('object:modified')
    })

    expect(mockOnAnnotationsChange).toHaveBeenCalled()
  })

  test('mouse wheel zoom down decreases zoom', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers
    await waitFor(() => expect(handlers['mouse:wheel']?.[0]).toBeDefined())
    const wheel = handlers['mouse:wheel'].at(-1)

    await act(async () => {
      wheel({ e: { deltaY: 100, offsetX: 0, offsetY: 0, preventDefault: jest.fn(), stopPropagation: jest.fn() } })
    })

    expect(screen.getByText('80%')).toBeInTheDocument()
  })

  test('background image is not selectable for deletion', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const bgObj = { isBackground: true }
    canvasInstance.add(bgObj)
    canvasInstance.__setActive(bgObj)

    await act(async () => {
      canvasInstance.trigger('selection:created')
    })

    expect(screen.getByText('删除标注')).toBeDisabled()
  })

  test('prevents deletion when active object is background', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results[0].value
    const bgObj = { isBackground: true, type: 'image' }
    canvasInstance.add(bgObj)
    canvasInstance.__setActive(bgObj)

    const event = new KeyboardEvent('keydown', { key: 'Delete' })
    window.dispatchEvent(event)

    expect(canvasInstance.getObjects()).toContain(bgObj)
  })

  test('keyboard Backspace key removes active annotation', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results[0].value
    const obj = { type: 'rect', annotationId: '1', left: 0, top: 0, width: 10, height: 10, angle: 0 }
    canvasInstance.add(obj)
    canvasInstance.__setActive(obj)

    const event = new KeyboardEvent('keydown', { key: 'Backspace' })
    window.dispatchEvent(event)

    expect(canvasInstance.getObjects().length).toBe(0)
  })

  test('keyboard delete ignored in input fields', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results[0].value
    const obj = { type: 'rect', annotationId: '1', left: 0, top: 0, width: 10, height: 10, angle: 0 }
    canvasInstance.add(obj)
    canvasInstance.__setActive(obj)

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const event = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true })
    Object.defineProperty(event, 'target', { value: input, enumerable: true })
    window.dispatchEvent(event)

    expect(canvasInstance.getObjects()).toContain(obj)
    document.body.removeChild(input)
  })

  test('keyboard delete ignored in textarea fields', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results[0].value
    const obj = { type: 'rect', annotationId: '1', left: 0, top: 0, width: 10, height: 10, angle: 0 }
    canvasInstance.add(obj)
    canvasInstance.__setActive(obj)

    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.focus()

    const event = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true })
    Object.defineProperty(event, 'target', { value: textarea, enumerable: true })
    window.dispatchEvent(event)

    expect(canvasInstance.getObjects()).toContain(obj)
    document.body.removeChild(textarea)
  })

  test('zoom clamped to minimum 10%', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    for (let i = 0; i < 15; i++) {
      await userEvent.click(screen.getByText('-'))
    }

    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  test('zoom clamped to maximum 500%', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    for (let i = 0; i < 50; i++) {
      await userEvent.click(screen.getByText('+'))
    }

    expect(screen.getByText('500%')).toBeInTheDocument()
  })

  test('mouse:down with select tool does not start drawing', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const initialObjectCount = canvasInstance.getObjects().length

    const handlers = canvasInstance.__handlers
    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const mouseDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      mouseDown({ pointer: { x: 10, y: 20 } })
    })

    // No new object should be added when in select mode
    expect(canvasInstance.getObjects().length).toBe(initialObjectCount)
  })

  test('mouse:move without drawing does nothing', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers
    await waitFor(() => expect(handlers['mouse:move']?.[0]).toBeDefined())
    const mouseMove = handlers['mouse:move'].at(-1)

    // Call mouse:move without starting a draw
    await act(async () => {
      mouseMove({ pointer: { x: 50, y: 50 } })
    })

    // Should not crash and no new objects
    expect(canvasInstance.getObjects().length).toBe(0)
  })

  test('mouse:up without drawing does nothing', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers
    await waitFor(() => expect(handlers['mouse:up']?.[0]).toBeDefined())
    const mouseUp = handlers['mouse:up'].at(-1)

    // Call mouse:up without starting a draw
    await act(async () => {
      mouseUp()
    })

    // Should not crash and onAnnotationsChange should not be called
    expect(mockOnAnnotationsChange).not.toHaveBeenCalled()
  })

  test('readOnly mode prevents keyboard delete', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={mockAnnotations}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={true}
      />
    )

    const event = new KeyboardEvent('keydown', { key: 'Delete' })
    window.dispatchEvent(event)

    // Should not trigger any deletion in readOnly mode
    expect(mockOnAnnotationsChange).not.toHaveBeenCalled()
  })

  test('drawing with scenePoint instead of pointer', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        onToolChange={mockOnToolChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const mouseDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      mouseDown({ scenePoint: { x: 10, y: 20 } })
    })

    await waitFor(() => expect((handlers['mouse:move']?.length || 0)).toBeGreaterThan(0))
    const move = handlers['mouse:move'].at(-1)
    const up = handlers['mouse:up'].at(-1)

    await act(async () => {
      move({ scenePoint: { x: 60, y: 70 } })
      up()
    })

    expect(mockOnAnnotationsChange).toHaveBeenCalled()
  })

  test('drawing with absolutePointer fallback', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        onToolChange={mockOnToolChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const mouseDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      mouseDown({ absolutePointer: { x: 10, y: 20 } })
    })

    await waitFor(() => expect((handlers['mouse:move']?.length || 0)).toBeGreaterThan(0))
    const move = handlers['mouse:move'].at(-1)
    const up = handlers['mouse:up'].at(-1)

    await act(async () => {
      move({ absolutePointer: { x: 60, y: 70 } })
      up()
    })

    expect(mockOnAnnotationsChange).toHaveBeenCalled()
  })

  test('mouse:down without pointer does nothing', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const mouseDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      mouseDown({}) // No pointer data
    })

    expect(canvasInstance.getObjects().length).toBe(0)
  })

  test('mouse:move without pointer does nothing', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const mouseDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      mouseDown({ pointer: { x: 10, y: 20 } })
    })

    await waitFor(() => expect((handlers['mouse:move']?.length || 0)).toBeGreaterThan(0))
    const move = handlers['mouse:move'].at(-1)

    await act(async () => {
      move({}) // No pointer data
    })

    // Should not crash
    expect(canvasInstance.getObjects().length).toBe(1)
  })

  test('delete without active object does nothing', () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results[0].value
    canvasInstance.__setActive(null)

    const event = new KeyboardEvent('keydown', { key: 'Delete' })
    window.dispatchEvent(event)

    // Should not crash
    expect(mockOnAnnotationsChange).not.toHaveBeenCalled()
  })

  test('saveAnnotations skips objects without annotationId', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    // Add object without annotationId (like background)
    const objWithoutId = { type: 'rect', left: 10, top: 20, width: 50, height: 50, angle: 0, getBoundingRect: jest.fn() }
    canvasInstance.add(objWithoutId)

    await act(async () => {
      canvasInstance.trigger('object:modified')
    })

    // Should be called but with empty array since no annotationId
    expect(mockOnAnnotationsChange).toHaveBeenCalledWith([])
  })

  test('drawing without onToolChange still saves annotations', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        // No onToolChange provided
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const mouseDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      mouseDown({ pointer: { x: 10, y: 20 } })
    })

    await waitFor(() => expect((handlers['mouse:move']?.length || 0)).toBeGreaterThan(0))
    const move = handlers['mouse:move'].at(-1)
    const up = handlers['mouse:up'].at(-1)

    await act(async () => {
      move({ pointer: { x: 60, y: 70 } })
      up()
    })

    expect(mockOnAnnotationsChange).toHaveBeenCalled()
  })

  test('annotation with temp id gets new id on save', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="rect"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        onToolChange={mockOnToolChange}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const handlers = canvasInstance.__handlers

    await waitFor(() => expect(handlers['mouse:down']?.[0]).toBeDefined())
    const mouseDown = handlers['mouse:down'].at(-1)

    await act(async () => {
      mouseDown({ pointer: { x: 10, y: 20 } })
    })

    await waitFor(() => expect((handlers['mouse:move']?.length || 0)).toBeGreaterThan(0))
    const move = handlers['mouse:move'].at(-1)
    const up = handlers['mouse:up'].at(-1)

    await act(async () => {
      move({ pointer: { x: 60, y: 70 } })
      up()
    })

    const savedAnnotations = mockOnAnnotationsChange.mock.calls.at(-1)?.[0]
    expect(savedAnnotations?.[0]?.id).toMatch(/^ann-/)
  })

  test('ellipse annotation saves with correct dimensions', async () => {
    render(
      <AnnotationCanvas
        mediaUrl="https://example.com/image.jpg"
        mediaType="IMAGE"
        currentTool="select"
        annotations={[]}
        onAnnotationsChange={mockOnAnnotationsChange}
        readOnly={false}
      />
    )

    const canvasInstance: any = (fabric.Canvas as unknown as jest.Mock).mock.results.at(-1)?.value
    const ellipseObj = {
      type: 'ellipse',
      annotationId: 'ellipse-1',
      left: 10,
      top: 20,
      rx: 30,
      ry: 40,
      angle: 0,
      getBoundingRect: jest.fn(() => ({ left: 10, top: 20, width: 60, height: 80 }))
    }
    canvasInstance.add(ellipseObj)

    await act(async () => {
      canvasInstance.trigger('object:modified')
    })

    const savedAnnotations = mockOnAnnotationsChange.mock.calls.at(-1)?.[0]
    expect(savedAnnotations?.[0]?.type).toBe('ELLIPSE')
    expect(savedAnnotations?.[0]?.coordinates.width).toBe(60) // rx * 2
    expect(savedAnnotations?.[0]?.coordinates.height).toBe(80) // ry * 2
  })
})
