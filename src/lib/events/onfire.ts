/**
 * mini (~500 b) version for event-emitter.
 *
 * Created by hustcc on 2018/12/31
 * Contract: vip@hust.edu.cn
 */

type Fn = (...args: unknown[]) => unknown
interface Listener {
  cb: Fn
  once: boolean
}

type EventsType = Record<string, Listener[]>

/**
 * const ee = new OnFire();
 *
 * ee.on('click', (...values) => {});
 *
 * ee.on('mouseover', (...values) => {});
 *
 * ee.emit('click', 1, 2, 3);
 * ee.fire('mouseover', {}); // same with emit
 *
 * ee.off();
 */
export default class OnFire {
  static ver = '__VERSION__'

  private _name: string

  constructor(_name: string = '') {
    this._name = _name
  }

  get name(): string {
    return this._name
  }

  // 所有事件的监听器
  private es: EventsType = {}

  /**
   * 注册事件监听器
   * @param eventName - 事件名称
   * @param cb - 回调函数
   * @param once - 是否只触发一次
   */
  on(eventName: string, cb: Fn, once: boolean = false): void {
    if (!this.es[eventName]) {
      this.es[eventName] = []
    }
    this.es[eventName].push({
      cb,
      once
    })
  }

  /**
   * 注册只触发一次的事件监听器
   * @param eventName - 事件名称
   * @param cb - 回调函数
   */
  once(eventName: string, cb: Fn): void {
    this.on(eventName, cb, true)
  }

  /**
   * 触发事件
   * @param eventName - 事件名称
   * @param params - 传递给监听器的参数
   * @returns 最后一个监听器的返回值
   */
  fire<T = undefined>(eventName: string, ...params: unknown[]): T {
    const listeners = this.es[eventName]

    if (!listeners || listeners.length === 0) return undefined as T

    let ret: T
    const indicesToRemove: number[] = []

    // 首先调用所有监听器并收集 'once' 监听器的索引
    for (let i = 0; i < listeners.length; i += 1) {
      const { cb, once } = listeners[i]

      ret = cb.apply(this, params) as T

      if (once) {
        indicesToRemove.push(i)
      }
    }

    // 反向移除 'once' 监听器以避免索引偏移问题
    for (let i = indicesToRemove.length - 1; i >= 0; i -= 1) {
      listeners.splice(indicesToRemove[i], 1)
    }

    // 返回最后一个监听器的结果
    return ret!
  }

  /**
   * 移除事件监听器
   * @param eventName - 事件名称（可选）
   * @param cb - 回调函数（可选）
   */
  off(eventName?: string, cb?: Fn): void {
    if (eventName === undefined) {
      // 移除所有事件监听器
      this.es = {}
    } else if (cb === undefined) {
      // 移除指定事件的所有监听器
      if (!this.es[eventName] || this.es[eventName].length === 0) return
      delete this.es[eventName]
    } else {
      // 移除指定事件的特定监听器
      const listeners = this.es[eventName] || []
      let l = listeners.length
      for (let i = 0; i < l; i += 1) {
        if (listeners[i].cb === cb) {
          listeners.splice(i, 1)
          i -= 1
          l -= 1
        }
      }
    }
  }

  /**
   * 触发事件（fire 的别名）
   * @param eventName - 事件名称
   * @param params - 传递给监听器的参数
   * @returns 最后一个监听器的返回值
   */
  emit(eventName: string, ...params: unknown[]): unknown {
    return this.fire(eventName, ...params)
  }
}
