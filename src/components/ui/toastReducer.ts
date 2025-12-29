
import { ReactNode } from 'react'

export type ToastPosition = 'tr' | 'tl' | 'br' | 'bl' | 'tc' | 'bc' | 'center'
export type ToastType = 'show' | 'success' | 'error' | 'info' | 'warn'
export interface ToastOption {
  type?: ToastType
  message: ReactNode
  mask?: boolean
  position?: ToastPosition
  autoClose?: number | boolean
  onClick?: () => void
  clickToClose?: boolean
}
export interface IToast extends ToastOption { id: string }

export type ActionType =
  { type: 'ADD_TOAST', payload: IToast } |
  { type: 'REMOVE_TOAST', payload?: string } |
  { type: 'SET_POSITION', payload?: ToastPosition } |
  { type: 'CLEAR_TOASTS' } |
  { type: 'SET_MASK', payload: boolean }

export type ToastHandler = (message: ReactNode, option?: Omit<ToastOption, 'message'>) =>
  ({ destroy: () => void, id: string })
/** Defaults */
export const DEFAULT_POSITION = 'tr' as ToastPosition

export const initialState = {
  toasts: [] as IToast[], mask: false, position: DEFAULT_POSITION
}

export const toastReducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        position: action.payload.position || DEFAULT_POSITION,
        mask: action.payload.mask || false,
        toasts: [...state.toasts, action.payload],
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        position: DEFAULT_POSITION,
        mask: false,
        toasts: !action.payload ? [] : state.toasts.filter(toast => toast.id !== action.payload),
      }
    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: [],
      }
    case 'SET_MASK':
      return {
        ...state,
        mask: action.payload,
      }
    case 'SET_POSITION':
      return {
        ...state,
        position: action.payload || DEFAULT_POSITION,
      }
    default:
      return state
  }
}
