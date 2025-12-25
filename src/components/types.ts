import { CSSProperties, MouseEvent, ReactNode } from 'react'

export type MouseHandler<T = HTMLElement> = T extends HTMLElement ? (evt: MouseEvent<T>) => any : () => any
export interface BaseProps {
  className?: string
  key?: string | number
  id?: string
  children?: ReactNode | ReactNode[]
  style?: CSSProperties
  onClick?: MouseHandler | MouseHandler<HTMLElement>
}


export type ComponentSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'
export type ComponentType = 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost' | 'default'
   | 'warning' | 'danger' | 'error' | 'success' | 'link' | 'info' | 'hot' | 'yellow'
export type ComponentShape = 'round' | 'square' | 'circle' | 'pill'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  htmlType?: 'submit' | 'reset' | 'button'
  border?: boolean
  type?: ComponentType
  size?: ComponentSize
  shape?: ComponentShape
  disabled?: boolean
  wide?: boolean
  block?: boolean
  dashed?: boolean
  outline?: boolean
  icon?: string | ReactNode
  /** 加载状态 */
  loading?: boolean
  loadingText?: ReactNode
  active?: boolean
  soft?: boolean
}

interface IInputProps {
  bordered?: boolean
  borderRadius?: number
  size?: ComponentSize
  type?: ComponentType
  width?: number | string
  onChangeValue?: (value: string) => void
  addonClassName?: string
  addonBefore?: ReactNode
  addonAfter?: ReactNode
}

export type InputProps<E, O extends keyof any = 'size' | 'type'> = IInputProps & Omit<React.HTMLAttributes<E>, O>


export interface IPaginatedResp<T = any> { list: T[], total: number }