/** EventTriggers
 * @author handy @handycode
 * @description 通过事件委托机制，全局只需要增加一次事件监听
 * @method addTrigger 增加  removeTrigger 删除
 * @example
 *  const trigger = (e: MouseEvent) => {
 *
 *  }
 *  useEffect(() => {
 *    const remove = addTrigger('click', trigger, 'a.has_console')
 *    return () => remove()
 *  }, [])
 *
 * @method fireClickTriggers  调用 click trigger
 *  container:
 *    document.body.addEventListener('click', fireClickTriggers)
 *  unbind
 *    document.body.removeEventListener('click', fireClickTriggers)
 */

type triggerType = 'click' | 'mouseover' | 'mousedown'
type Trigger = (e: MouseEvent) => void
type ISelector = ((e: MouseEvent) => boolean) | string

interface EventTriggers {
  [key: string]: {
    trigger: Trigger,
    selector?: ISelector
  }[]
}

const eventTriggers: EventTriggers = {}

export const removeTrigger = (type: triggerType, trigger: Trigger) => {
  if (!eventTriggers[type]) return
  eventTriggers[type] = eventTriggers[type].filter(item => item?.trigger !== trigger)
}

export const addTrigger = (type: triggerType, trigger: Trigger, selector?: ISelector) => {
  if (!eventTriggers[type]) eventTriggers[type] = []
  eventTriggers[type].push({ trigger, selector })

  return () => removeTrigger(type, trigger)
}

export const getTriggers = (type: triggerType) => eventTriggers[type] || []

export const fireTriggers = (type: triggerType, e: MouseEvent) => {
  if (!eventTriggers[type]) return

  eventTriggers[type].forEach(item => {
    if (!item || !item.trigger) return

    if (!item.selector) {
      item.trigger(e)
      return
    }

    const target = e.target as HTMLElement
    if (typeof item.selector === 'string') {
      if (target.tagName === item.selector ||
        (target.matches && target.matches(item.selector)) ||
        (target.webkitMatchesSelector && target.webkitMatchesSelector(item.selector))
      ) {
        item.trigger(e)
      }
    } else if (item.selector(e)) {
      item.trigger(e)
    }
  })
}

export const fireClickTriggers = fireTriggers.bind(null, 'click')
export const fireMouseOverTriggers = fireTriggers.bind(null, 'mouseover')
export const fireMouseDownTriggers = fireTriggers.bind(null, 'mousedown')
