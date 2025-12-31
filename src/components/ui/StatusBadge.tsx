import React from 'react'

export type StatusOption = { key: string; label: string; badgeClass: string }

export const STATUS_OPTIONS: StatusOption[] = [
  { key: 'PENDING', label: '待领取', badgeClass: 'badge-ghost' },
  { key: 'LABELING', label: '标注中', badgeClass: 'badge-info' },
  { key: 'LABELED', label: '已标注', badgeClass: 'badge-warning' },
  { key: 'CHECKING', label: '质检中', badgeClass: 'badge-accent' },
  { key: 'APPROVED', label: '已通过', badgeClass: 'badge-success' },
  { key: 'REJECTED', label: '已驳回', badgeClass: 'badge-error' },
]

export default function StatusBadge({ status }: { status: string }) {
  const entry = STATUS_OPTIONS.find((o) => o.key === status)
  return (
    <span className={`badge ${entry?.badgeClass || 'badge-ghost'}`}>
      {entry?.label || status}
    </span>
  )
}
