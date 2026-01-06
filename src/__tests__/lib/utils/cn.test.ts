import { cn } from '@/lib/utils/cn'

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('should handle conditional class names', () => {
    expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2')
  })

  it('should handle nested arrays', () => {
    expect(cn('class1', ['class2', 'class3'])).toBe('class1 class2 class3')
  })

  it('should handle complex combinations', () => {
    expect(cn('class1', { 'class2': true }, ['class3', { 'class4': true }])).toBe('class1 class2 class3 class4')
  })

  it('should ignore falsy values', () => {
    expect(cn('class1', null, undefined, '', 'class2')).toBe('class1 class2')
  })

  it('should handle null and undefined objects', () => {
    expect(cn('class1', null, undefined, 'class2')).toBe('class1 class2')
  })
})