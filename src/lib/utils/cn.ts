import { twMerge } from 'tailwind-merge'

/**
 * 条件类名对象类型
 */
type ClassValue = string | number | boolean | undefined | null
type ClassObject = Record<string, ClassValue>
type ClassArray = ClassInput[]
type ClassInput = ClassValue | ClassObject | ClassArray

/**
 * 合并类名的工具函数
 * 支持字符串、对象、数组等多种格式，并使用 tailwind-merge 解决冲突
 *
 * @param args - 可以是字符串、对象或数组
 * @returns 合并后的类名字符串
 *
 * @example
 * cn('btn', 'btn-primary') // => 'btn btn-primary'
 * cn('text-red-500', 'text-blue-500') // => 'text-blue-500' (后者覆盖前者)
 * cn({ 'active': true, 'disabled': false }) // => 'active'
 * cn('base', { 'active': true }) // => 'base active'
 */
export function cn(...args: ClassInput[]): string {
  const classNames: string[] = []

  const processInput = (input: ClassInput): void => {
    if (!input) return

    if (typeof input === 'string') {
      classNames.push(input)
    } else if (typeof input === 'number') {
      classNames.push(String(input))
    } else if (Array.isArray(input)) {
      input.forEach(processInput)
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classNames.push(key)
      })
    }
  }

  args.forEach(processInput)
  return twMerge(classNames.join(' '))
}