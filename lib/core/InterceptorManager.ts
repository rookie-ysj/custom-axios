import {
  InterceptorHandler,
  InterceptorManager as InterceptorManagerType,
  InterceptorUseOptions,
  RejectFunc,
  ResolveFunc
} from "@/types";


export default class InterceptorManager<T> implements InterceptorManagerType<T> {
  public handlers: Array<InterceptorHandler<T> | null>

  constructor() {
    this.handlers = []
  }

  use(fulfilled: ResolveFunc, rejected?: RejectFunc, options?: InterceptorUseOptions) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options?.synchronous ?? false
    })

    return this.handlers.length - 1
  }

  eject(id: number) {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  clear() {
    if (this.handlers) {
      this.handlers = []
    }
  }

  forEach(fn: (func: InterceptorHandler) => any) {
    this.handlers.forEach((handler) => {
      if (handler !== null) {
        fn(handler)
      }
    })
  }
}
