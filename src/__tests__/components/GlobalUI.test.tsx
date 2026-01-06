import React from 'react'
import { render, screen } from '@testing-library/react'
import GlobalUI from '@/components/GlobalUI'
import '@testing-library/jest-dom'

// Mock the MediaPreview and ToastContainer components
jest.mock('@/components/MediaPreview', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="media-preview">{children}</div>
  ),
}))

jest.mock('@/components/ui/Toast', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}))

describe('GlobalUI component', () => {
  test('renders children correctly', () => {
    render(
      <GlobalUI>
        <div>Test Content</div>
      </GlobalUI>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('renders MediaPreview component', () => {
    render(
      <GlobalUI>
        <div>Child Content</div>
      </GlobalUI>
    )

    expect(screen.getByTestId('media-preview')).toBeInTheDocument()
  })

  test('renders ToastContainer component', () => {
    render(
      <GlobalUI>
        <div>Child Content</div>
      </GlobalUI>
    )

    expect(screen.getByTestId('toast-container')).toBeInTheDocument()
  })

  test('wraps children with MediaPreview and includes ToastContainer', () => {
    render(
      <GlobalUI>
        <div data-testid="test-child">Child Content</div>
      </GlobalUI>
    )

    // MediaPreview should wrap the children
    const mediaPreview = screen.getByTestId('media-preview')
    expect(mediaPreview).toBeInTheDocument()
    expect(screen.getByTestId('test-child')).toBeInTheDocument()

    // ToastContainer should be rendered
    expect(screen.getByTestId('toast-container')).toBeInTheDocument()
  })

  test('renders multiple children correctly', () => {
    render(
      <GlobalUI>
        <div>First Child</div>
        <div>Second Child</div>
        <span>Third Child</span>
      </GlobalUI>
    )

    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
    expect(screen.getByText('Third Child')).toBeInTheDocument()
  })
})
