import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Toolbar from '@/components/annotation/Toolbar'
import '@testing-library/jest-dom'

describe('Toolbar component', () => {
  const mockOnToolChange = jest.fn()

  beforeEach(() => {
    mockOnToolChange.mockClear()
  })

  test('renders all tool buttons', () => {
    render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    expect(screen.getByText('选择')).toBeInTheDocument()
    expect(screen.getByText('矩形')).toBeInTheDocument()
    expect(screen.getByText('椭圆')).toBeInTheDocument()
  })

  test('highlights current tool', () => {
    render(
      <Toolbar
        currentTool="rect"
        onToolChange={mockOnToolChange}
      />
    )

    const rectButton = screen.getByText('矩形')
    expect(rectButton).toHaveClass('btn-primary')
  })

  test('non-selected tools have ghost styling', () => {
    render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    const rectButton = screen.getByText('矩形')
    const ellipseButton = screen.getByText('椭圆')

    expect(rectButton).toHaveClass('btn-ghost')
    expect(ellipseButton).toHaveClass('btn-ghost')
  })

  test('calls onToolChange when selecting tool', () => {
    render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    fireEvent.click(screen.getByText('矩形'))
    expect(mockOnToolChange).toHaveBeenCalledWith('rect')
  })

  test('calls onToolChange with correct tool id', () => {
    render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    fireEvent.click(screen.getByText('选择'))
    expect(mockOnToolChange).toHaveBeenCalledWith('select')

    fireEvent.click(screen.getByText('矩形'))
    expect(mockOnToolChange).toHaveBeenCalledWith('rect')

    fireEvent.click(screen.getByText('椭圆'))
    expect(mockOnToolChange).toHaveBeenCalledWith('ellipse')
  })

  test('renders help text', () => {
    render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    expect(screen.getByText('提示: 选择工具后在画布上拖拽绘制，滚轮缩放')).toBeInTheDocument()
  })

  test('renders with correct structure', () => {
    const { container } = render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    const toolbar = container.firstChild
    expect(toolbar).toHaveClass('flex', 'items-center', 'gap-1', 'p-2', 'bg-base-100', 'rounded-lg', 'shadow', 'mb-4')
  })

  test('has tool label', () => {
    render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    expect(screen.getByText('工具:')).toBeInTheDocument()
  })

  test('has divider between tools and help text', () => {
    const { container } = render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    const divider = container.querySelector('.divider.divider-horizontal')
    expect(divider).toBeInTheDocument()
  })

  test('all buttons are small size', () => {
    render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    const selectButton = screen.getByText('选择')
    const rectButton = screen.getByText('矩形')
    const ellipseButton = screen.getByText('椭圆')

    expect(selectButton).toHaveClass('btn-sm')
    expect(rectButton).toHaveClass('btn-sm')
    expect(ellipseButton).toHaveClass('btn-sm')
  })

  test('changes tool selection when clicking different tools', () => {
    const { rerender } = render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    expect(screen.getByText('选择')).toHaveClass('btn-primary')

    fireEvent.click(screen.getByText('矩形'))

    rerender(
      <Toolbar
        currentTool="rect"
        onToolChange={mockOnToolChange}
      />
    )

    expect(screen.getByText('矩形')).toHaveClass('btn-primary')
    expect(screen.getByText('选择')).toHaveClass('btn-ghost')
  })

  test('can switch between all tools', () => {
    const { rerender } = render(
      <Toolbar
        currentTool="select"
        onToolChange={mockOnToolChange}
      />
    )

    // Select tool
    expect(screen.getByText('选择')).toHaveClass('btn-primary')

    // Switch to rect
    rerender(
      <Toolbar
        currentTool="rect"
        onToolChange={mockOnToolChange}
      />
    )
    expect(screen.getByText('矩形')).toHaveClass('btn-primary')

    // Switch to ellipse
    rerender(
      <Toolbar
        currentTool="ellipse"
        onToolChange={mockOnToolChange}
      />
    )
    expect(screen.getByText('椭圆')).toHaveClass('btn-primary')
  })
})
