import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '@/components/ui/Button'
import '@testing-library/jest-dom'

describe('Button component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('rounded-xl') // default shape is round
    expect(button).not.toBeDisabled()
    expect(button).toHaveAttribute('type', 'button')
  })

  test('renders children correctly', () => {
    render(<Button><span>Hello World</span></Button>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  test('applies type classes correctly', () => {
    const { rerender } = render(<Button type="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')

    rerender(<Button type="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')

    rerender(<Button type="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-error') // 'danger' type should map to 'btn-error'

    rerender(<Button type="accent">Accent</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-accent')

    rerender(<Button type="info">Info</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-info')

    rerender(<Button type="success">Success</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-success')

    rerender(<Button type="warning">Warning</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-warning')

    rerender(<Button type="error">Error</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-error')

    rerender(<Button type="neutral">Neutral</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-neutral')

    rerender(<Button type="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-ghost')

    rerender(<Button type="hot">Hot</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-hot')

    rerender(<Button type="yellow">Yellow</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-yellow')

    rerender(<Button type="link">Link</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-link')
  })

  test('applies size classes correctly', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-sm')

    rerender(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-lg')

    rerender(<Button size="xsmall">XSmall</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-xs')

    rerender(<Button size="xlarge">XLarge</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-xl')

    rerender(<Button size="default">Default</Button>)
    const button = screen.getByRole('button')
    // Default size should not have any specific size class
    expect(button).not.toHaveClass('btn-xs')
    expect(button).not.toHaveClass('btn-sm')
    expect(button).not.toHaveClass('btn-lg')
    expect(button).not.toHaveClass('btn-xl')
  })

  test('applies shape classes correctly', () => {
    const { rerender } = render(<Button shape="square">Square</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-square')

    rerender(<Button shape="pill">Pill</Button>)
    expect(screen.getByRole('button')).toHaveClass('rounded-full')

    rerender(<Button shape="round">Round</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-xl')

    rerender(<Button shape="circle">Circle</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-circle')

    rerender(<Button>Default</Button>)
    // Default shape should not have specific shape classes
    expect(screen.getByRole('button')).toHaveClass('rounded-xl')
    expect(screen.getByRole('button')).not.toHaveClass('btn-square')
    expect(screen.getByRole('button')).not.toHaveClass('rounded-full')
    expect(screen.getByRole('button')).not.toHaveClass('btn-circle')
  })

  test('applies boolean prop classes correctly', () => {
    const { rerender } = render(<Button block>Block</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-block')

    rerender(<Button dashed>Dashed</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-dash')

    rerender(<Button outline>Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-outline')

    rerender(<Button border={false}>No Border</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-none')

    rerender(<Button active>Active</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-active')

    rerender(<Button soft>Soft</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-soft')

    rerender(<Button wide>Wide</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-wide')
  })

  test('passes through custom className', () => {
    render(<Button className="my-custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('my-custom-class')
  })

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('handles loading state correctly', () => {
    const { rerender } = render(<Button loading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('opacity-80', 'cursor-not-allowed')
    expect(button).toHaveTextContent('Loading')

    rerender(<Button loading loadingText="Saving...">Original Text</Button>)
    expect(screen.getByRole('button')).toHaveClass('opacity-80', 'cursor-not-allowed')
    expect(screen.getByRole('button')).toHaveTextContent('Saving...')
    expect(screen.getByRole('button')).not.toHaveTextContent('Original Text')
  })

  test('renders an icon when icon prop is a ReactNode', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />
    render(<Button icon={<CustomIcon />}>With Icon</Button>)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  test('sets htmlType attribute correctly', () => {
    const { rerender } = render(<Button htmlType="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')

    rerender(<Button htmlType="reset">Reset</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
  })

  test('fires onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not fire onClick handler when disabled', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled>Disabled</Button>)
    screen.getByRole('button').click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('does not fire onClick handler when loading', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} loading>Loading</Button>)
    screen.getByRole('button').click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('does not fire onClick handler when both disabled and loading', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled loading>Loading</Button>)
    screen.getByRole('button').click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('renders loading spinner with correct size for xsmall button', () => {
    render(<Button size="xsmall" loading>Loading</Button>)
    const spinner = screen.getByRole('button').querySelector('.loading')
    expect(spinner).toHaveClass('w-3', 'h-3')
  })

  test('renders loading spinner with default size for non-xsmall button', () => {
    render(<Button size="small" loading>Loading</Button>)
    const spinner = screen.getByRole('button').querySelector('.loading')
    expect(spinner).not.toHaveClass('w-3', 'h-3')
  })

  test('renders children when not loading', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  test('renders loadingText when loading and loadingText is provided', () => {
    render(<Button loading loadingText="Saving...">Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Saving...')
  })

  test('renders children when loading but no loadingText is provided', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})