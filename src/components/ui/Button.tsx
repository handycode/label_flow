import { FC } from 'react'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/components/types'

const Button: FC<ButtonProps> = props => {
  const {
    children,
    wide,
    block,
    dashed,
    outline,
    icon,
    loading,
    active,
    soft,
    loadingText,
    disabled,
    onClick,
    border = true,
    className = '',
    htmlType = 'button',
    type = 'default',
    size = 'default',
    shape = 'round',
    ...rest
  } = props

  const clickable = !disabled && !loading

  const classNames = cn('btn', {
    ['btn-xs']: size === 'xsmall',
    ['btn-sm']: size === 'small',
    ['btn-lg']: size === 'large',
    ['btn-xl']: size === 'xlarge',

    ['btn-primary']: type === 'primary',
    ['btn-secondary']: type === 'secondary',
    ['btn-accent']: type === 'accent',
    ['btn-link']: type === 'link',
    ['btn-info']: type === 'info',
    ['btn-success']: type === 'success',
    ['btn-warning']: type === 'warning',
    ['btn-error']: type === 'error' || type === 'danger',
    ['btn-neutral']: type === 'neutral',
    ['btn-ghost']: type === 'ghost',
    ['btn-hot']: type === 'hot',
    ['btn-yellow']: type === 'yellow',

    // ['rounded']: shape === 'round',
    ['rounded-full']: shape === 'pill',
    ['rounded-xl']: shape === 'round',
    ['btn-square aspect-square']: shape === 'square',
    ['btn-circle aspect-square']: shape === 'circle',
    ['min-w-8 min-h-8']: (shape === 'square' || shape === 'circle') && size === 'xsmall',
    ['min-w-10 min-h-10']: (shape === 'square' || shape === 'circle') && size === 'small',
    ['min-w-12 min-h-12']: (shape === 'square' || shape === 'circle') && size === 'default',
    ['min-w-14 min-h-14']: (shape === 'square' || shape === 'circle') && size === 'large',
    ['min-w-16 min-h-16']: (shape === 'square' || shape === 'circle') && size === 'xlarge',

    ['btn-outline']: outline,
    ['btn-block']: block,
    ['btn-wide']: wide,
    ['btn-dash']: dashed,
    ['border-none']: !border,
    ['btn-active']: active,
    ['btn-soft']: soft,
    ['btn-disabled']: disabled,
    ['opacity-80 cursor-not-allowed']: !clickable,
  }, className)

  const getIcon = () => {
    if (loading) return <span className={cn('loading loading-spinner', { 'w-3 h-3': size === 'xsmall' })}></span>
    if (!icon) return null
    if (typeof icon === 'string') return <i className={`icon-${icon}`}></i>
    return icon
  }

  return (
    <button
      className={classNames}
      type={htmlType}
      disabled={disabled}
      onClick={clickable ? onClick : undefined}
      {...rest}
    >
      {getIcon()}
      <span className={cn({ 'truncate': shape === 'square' || shape === 'circle' })}>
        {loading ? (loadingText || children) : children}
      </span>
    </button>
  )
}

export default Button
