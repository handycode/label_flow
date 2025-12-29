'use client'

import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useReducer } from 'react'
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XCircleIcon, XIcon } from 'lucide-react'
import { v4 } from 'uuid'
import eventBus from '@/lib/events/eventBus'
import { initialState, IToast, ToastHandler, ToastOption, toastReducer, ToastType } from './toastReducer'

const DEFAULT_DURATION = 5000

const show = (message: ReactNode, option: Omit<ToastOption, 'message'>) =>
  eventBus.fire(eventBus.events.SHOW_TOAST, { message, type: 'show', ...option })

interface IToastHandlers {
  show: ToastHandler,
  remove: (id?: string) => void,
  success: ToastHandler,
  error: ToastHandler,
  fail: ToastHandler,
  info: ToastHandler,
  warn: ToastHandler
}

const toast = {
  show,
  remove: (id?: string) => eventBus.fire(eventBus.events.REMOVE_TOAST, id),
} as any as IToastHandlers

(['success', 'error', 'warn', 'info', 'fail'] as ToastType[]).forEach(type => {
  toast[type] = (message: ReactNode, option?: Omit<ToastOption, 'message'>) => {
    const res = show(message, { type, ...option })
    return res || { id: '', destroy: () => { } }
  }
})

export default toast

export const showToast = toast.show
export const removeToast = toast.remove

const ToastTypesConfig = {
  show: {
    icon: null as ReactNode,
    bgClass: 'bg-accent text-accent-content'
  },
  success: {
    icon: <CheckCircle2Icon className="stroke-current shrink-0 h-6 w-6 " />,
    bgClass: 'alert-success',
  },
  warn: {
    icon: <AlertTriangleIcon className="stroke-current shrink-0 h-6 w-6 " />,
    bgClass: 'alert-warning',
  },
  info: {
    icon: <InfoIcon className="stroke-current shrink-0 h-6 w-6" />,
    bgClass: 'alert-info',
  },
  error: {
    icon: <XCircleIcon className="stroke-current shrink-0 h-6 w-6" />,
    bgClass: 'alert-error',
  },
  fail: {
    icon: <XCircleIcon className="stroke-current shrink-0 h-6 w-6" />,
    bgClass: 'alert-error',
  }
}

const Toast = (props: IToast) => {
  const { id, message, type, autoClose, clickToClose, onClick } = props
  const duration = autoClose === false ? -1 : (typeof autoClose === 'number' ? autoClose : DEFAULT_DURATION)
  const { icon, bgClass } = ToastTypesConfig[type || 'show']
  const alertHoverClass = 'hover:shadow-lg transition-all'
  const alertClasses = cn(
    'alert border-none',
    'shadow-md',
    alertHoverClass,
    bgClass
  )
  const { remove } = toast

  const handleClick = () => {
    if (onClick) onClick()
    if (clickToClose) remove(id)
  }

  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(() => remove(id), duration)
    return () => clearTimeout(timer)
  }, [id, remove, duration])

  return (
    <div className={alertClasses} onClick={handleClick} role="alert">
      {icon}<pre>{message}</pre>
      {!duration && <XIcon onClick={() => remove(id)} className="cursor-pointer hover:text-white" />}
    </div>
  )

}



export const ToastContainer = () => {
  const [state, dispatch] = useReducer(toastReducer, initialState)
  // ADD
  const addToast = (type: ToastType = 'show', message: ReactNode, option: Partial<ToastOption>) => {
    const id = v4()
    dispatch({ type: 'ADD_TOAST', payload: { autoClose: 4000, ...option, message, id, type } })
    return { id, destroy: () => dispatch({ type: 'REMOVE_TOAST', payload: id }) }
  }
  // REMOVE
  const removeToast = (id?: string) => dispatch({ type: 'REMOVE_TOAST', payload: id })

  // EFFECT
  useEffect(() => {
    eventBus.on(eventBus.events.SHOW_TOAST, (option: unknown) => {
      const { type, message, ...rest } = option as ToastOption
      return addToast(type, message, rest)
    })
    eventBus.on(eventBus.events.REMOVE_TOAST, (id?: unknown) => {
      return removeToast(id as string)
    })
    return () => {
      eventBus.off(eventBus.events.SHOW_TOAST)
      eventBus.off(eventBus.events.REMOVE_TOAST)
    }
  }, [])

  const { position, toasts, mask } = state

  const postionClasses = cn({
    'toast-top': position[0] === 't',
    'toast-bottom': position[0] === 'b',
    'toast-start': position[1] === 'l',
    'toast-end': position[1] === 'r',
    'toast-middle toast-center': position === 'center'
  })
  return (
    <>
      {mask && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur"
          style={{ zIndex: '9998' }}
        />
      )}
      <div className={`toast ${cn(postionClasses)} max-h-screen overflow-y-auto empty:hidden pb-6 z-[999]`}>
        {toasts.map((toast) => <Toast key={toast.id} {...toast} />)}
      </div>
    </>
  )
}
