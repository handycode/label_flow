import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import MetadataPanel from '@/components/annotation/MetadataPanel'
import '@testing-library/jest-dom'

describe('MetadataPanel component', () => {
  const mockMetadata = {
    remarks: 'Test remarks',
    score: 85,
  }

  const mockAnnotations = [
    { id: '1', type: 'rect', label: 'Person' },
    { id: '2', type: 'ellipse', label: 'Car' },
    { id: '3', type: 'rect', label: null },
  ]

  const mockCreator = { username: 'creator_user', email: 'creator@test.com' }
  const mockLabeler = { username: 'labeler_user', email: 'labeler@test.com' }
  const mockChecker = { username: 'checker_user', email: 'checker@test.com' }

  test('renders task information section', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
      />
    )

    expect(screen.getByText('任务信息')).toBeInTheDocument()
  })

  test('displays creator information when provided', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
        creator={mockCreator}
      />
    )

    expect(screen.getByText('创建者:')).toBeInTheDocument()
    expect(screen.getByText('creator_user')).toBeInTheDocument()
  })

  test('displays labeler information when provided', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
        labeler={mockLabeler}
      />
    )

    expect(screen.getByText('标注员:')).toBeInTheDocument()
    expect(screen.getByText('labeler_user')).toBeInTheDocument()
  })

  test('displays checker information when provided', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
        checker={mockChecker}
      />
    )

    expect(screen.getByText('质检员:')).toBeInTheDocument()
    expect(screen.getByText('checker_user')).toBeInTheDocument()
  })

  test('renders annotation list section', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
      />
    )

    expect(screen.getByText('标注列表')).toBeInTheDocument()
  })

  test('displays empty state when no annotations', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
      />
    )

    expect(screen.getByText('暂无标注')).toBeInTheDocument()
  })

  test('displays all annotations', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
      />
    )

    expect(screen.getByText('Person')).toBeInTheDocument()
    expect(screen.getByText('Car')).toBeInTheDocument()
  })

  test('renders multiple user roles together', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
        creator={mockCreator}
        labeler={mockLabeler}
        checker={mockChecker}
      />
    )

    expect(screen.getByText('creator_user')).toBeInTheDocument()
    expect(screen.getByText('labeler_user')).toBeInTheDocument()
    expect(screen.getByText('checker_user')).toBeInTheDocument()
  })

  test('does not render user info when not provided', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
      />
    )

    expect(screen.queryByText('创建者:')).not.toBeInTheDocument()
    expect(screen.queryByText('标注员:')).not.toBeInTheDocument()
    expect(screen.queryByText('质检员:')).not.toBeInTheDocument()
  })

  test('handles isReadOnly prop', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
        isReadOnly={true}
      />
    )

    // Component should render normally in read-only mode
    expect(screen.getByText('标注列表')).toBeInTheDocument()
  })

  test('handles userRole prop', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
        userRole="LABELER"
      />
    )

    // Component should render with user role
    expect(screen.getByText('标注列表')).toBeInTheDocument()
  })

  test('renders with empty metadata', () => {
    const emptyMetadata = { remarks: '' }

    render(
      <MetadataPanel
        metadata={emptyMetadata}
        annotations={[]}
      />
    )

    expect(screen.getByText('任务信息')).toBeInTheDocument()
    expect(screen.getByText('标注列表')).toBeInTheDocument()
  })

  test('renders card structure correctly', () => {
    const { container } = render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
      />
    )

    const cards = container.querySelectorAll('.card.bg-base-100.shadow')
    expect(cards.length).toBeGreaterThan(0)
  })

  test('annotation list items have correct structure', () => {
    const { container } = render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
      />
    )

    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBe(mockAnnotations.length)
  })

  test('handles annotations without labels', () => {
    const annotationsWithoutLabel = [
      { id: '1', type: 'rect', label: null },
    ]

    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={annotationsWithoutLabel}
      />
    )

    // Should still render the annotation
    expect(screen.getByText('标注列表')).toBeInTheDocument()
  })

  test('renders space-y layout', () => {
    const { container } = render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
      />
    )

    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('space-y-4')
  })

  test('displays annotation type as Chinese text', () => {
    const annotations = [
      { id: '1', type: 'RECT', label: 'Box' },
      { id: '2', type: 'ELLIPSE', label: 'Circle' },
    ]

    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={annotations}
      />
    )

    expect(screen.getByText(/矩形/)).toBeInTheDocument()
    expect(screen.getByText(/椭圆/)).toBeInTheDocument()
  })

  test('renders delete button for each annotation when not readOnly', () => {
    const mockDelete = jest.fn()

    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
        isReadOnly={false}
        onDeleteAnnotation={mockDelete}
      />
    )

    const deleteButtons = screen.getAllByText('删除')
    expect(deleteButtons).toHaveLength(mockAnnotations.length)
  })

  test('calls onDeleteAnnotation when delete button clicked', () => {
    const mockDelete = jest.fn()

    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
        isReadOnly={false}
        onDeleteAnnotation={mockDelete}
      />
    )

    const deleteButtons = screen.getAllByText('删除')
    fireEvent.click(deleteButtons[0])

    expect(mockDelete).toHaveBeenCalledWith('1')
  })

  test('does not render delete button when readOnly', () => {
    const mockDelete = jest.fn()

    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
        isReadOnly={true}
        onDeleteAnnotation={mockDelete}
      />
    )

    expect(screen.queryByText('删除')).not.toBeInTheDocument()
  })

  test('does not render delete button when no onDeleteAnnotation provided', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
        isReadOnly={false}
      />
    )

    expect(screen.queryByText('删除')).not.toBeInTheDocument()
  })

  test('displays quality score when not CHECKER role', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
        userRole="LABELER"
      />
    )

    expect(screen.getByText('质量评分')).toBeInTheDocument()
    expect(screen.getByText('已评分: 85/5')).toBeInTheDocument()
  })

  test('does not display quality score for CHECKER role', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={[]}
        userRole="CHECKER"
      />
    )

    expect(screen.queryByText('质量评分')).not.toBeInTheDocument()
  })

  test('does not display quality score when score is undefined', () => {
    const metadataWithoutScore = { remarks: 'Test' }

    render(
      <MetadataPanel
        metadata={metadataWithoutScore}
        annotations={[]}
        userRole="LABELER"
      />
    )

    expect(screen.queryByText('质量评分')).not.toBeInTheDocument()
  })

  test('renders annotation index numbers correctly', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
      />
    )

    expect(screen.getByText(/#1/)).toBeInTheDocument()
    expect(screen.getByText(/#2/)).toBeInTheDocument()
    expect(screen.getByText(/#3/)).toBeInTheDocument()
  })

  test('renders labels as badges', () => {
    render(
      <MetadataPanel
        metadata={mockMetadata}
        annotations={mockAnnotations}
      />
    )

    const personBadge = screen.getByText('Person')
    const carBadge = screen.getByText('Car')

    expect(personBadge).toHaveClass('badge', 'badge-sm')
    expect(carBadge).toHaveClass('badge', 'badge-sm')
  })
})
