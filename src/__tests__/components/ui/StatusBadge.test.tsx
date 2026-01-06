import React from 'react'
import { render, screen } from '@testing-library/react'
import StatusBadge, { STATUS_OPTIONS } from '@/components/ui/StatusBadge'
import '@testing-library/jest-dom'

describe('StatusBadge component', () => {
  test('renders with PENDING status', () => {
    render(<StatusBadge status="PENDING" />)
    const badge = screen.getByText('待领取')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge', 'badge-ghost')
  })

  test('renders with LABELING status', () => {
    render(<StatusBadge status="LABELING" />)
    const badge = screen.getByText('标注中')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge', 'badge-info')
  })

  test('renders with LABELED status', () => {
    render(<StatusBadge status="LABELED" />)
    const badge = screen.getByText('已标注')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge', 'badge-warning')
  })

  test('renders with CHECKING status', () => {
    render(<StatusBadge status="CHECKING" />)
    const badge = screen.getByText('质检中')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge', 'badge-accent')
  })

  test('renders with APPROVED status', () => {
    render(<StatusBadge status="APPROVED" />)
    const badge = screen.getByText('已通过')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge', 'badge-success')
  })

  test('renders with REJECTED status', () => {
    render(<StatusBadge status="REJECTED" />)
    const badge = screen.getByText('已驳回')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge', 'badge-error')
  })

  test('renders with unknown status', () => {
    render(<StatusBadge status="UNKNOWN" />)
    const badge = screen.getByText('UNKNOWN')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge', 'badge-ghost')
  })

  test('STATUS_OPTIONS contains all expected statuses', () => {
    expect(STATUS_OPTIONS).toHaveLength(6)
    const statusKeys = STATUS_OPTIONS.map(opt => opt.key)
    expect(statusKeys).toEqual(['PENDING', 'LABELING', 'LABELED', 'CHECKING', 'APPROVED', 'REJECTED'])
  })

  test('each STATUS_OPTIONS entry has required properties', () => {
    STATUS_OPTIONS.forEach(option => {
      expect(option).toHaveProperty('key')
      expect(option).toHaveProperty('label')
      expect(option).toHaveProperty('badgeClass')
      expect(typeof option.key).toBe('string')
      expect(typeof option.label).toBe('string')
      expect(typeof option.badgeClass).toBe('string')
    })
  })
})
