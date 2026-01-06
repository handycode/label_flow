import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Pagination from '@/components/Pagination'
import '@testing-library/jest-dom'

describe('Pagination component', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  test('renders with basic props', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('上一页')).toBeInTheDocument()
    expect(screen.getByText('下一页')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const prevButton = screen.getByText('上一页')
    expect(prevButton).toBeDisabled()
    expect(prevButton).toHaveClass('btn-disabled')
  })

  test('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByText('下一页')
    expect(nextButton).toBeDisabled()
    expect(nextButton).toHaveClass('btn-disabled')
  })

  test('calls onPageChange when clicking previous button', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    fireEvent.click(screen.getByText('上一页'))
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  test('calls onPageChange when clicking next button', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    fireEvent.click(screen.getByText('下一页'))
    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  test('calls onPageChange when clicking page number', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    fireEvent.click(screen.getByText('3'))
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  test('highlights current page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass('btn-primary')
  })

  test('shows all pages when totalPages <= 5', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.queryByText('...')).not.toBeInTheDocument()
  })

  test('shows ellipsis when currentPage is in the beginning', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('shows ellipsis when currentPage is in the end', () => {
    render(
      <Pagination
        currentPage={9}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('shows double ellipsis when currentPage is in the middle', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()

    const ellipses = screen.getAllByText('...')
    expect(ellipses).toHaveLength(2)
  })

  test('handles single page correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('上一页')).toBeDisabled()
    expect(screen.getByText('下一页')).toBeDisabled()
  })

  test('non-clickable ellipsis', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    const ellipses = screen.getAllByText('...')
    ellipses.forEach(ellipsis => {
      // Ellipsis should be a span, not a button
      expect(ellipsis.tagName).toBe('SPAN')
      expect(ellipsis).toHaveClass('px-3', 'py-1')
    })
  })

  test('page buttons have correct styling', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    // Current page should have btn-primary
    const currentPage = screen.getByText('2')
    expect(currentPage).toHaveClass('btn-primary')

    // Other pages should have btn-ghost
    const otherPage = screen.getByText('3')
    expect(otherPage).toHaveClass('btn-ghost')
  })

  test('all page buttons are of small size', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('btn-sm')
    })
  })

  test('renders in a centered flex container', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const paginationDiv = container.firstChild
    expect(paginationDiv).toHaveClass('flex', 'justify-center', 'items-center', 'space-x-2', 'py-6')
  })
})
