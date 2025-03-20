export interface isSomeType<T> {
  (value: unknown): value is T
}

export const isUndefined: isSomeType<undefined> = (val: unknown) => typeof val === 'undefined'
export const isString: isSomeType<string> = (val: unknown) => typeof val === 'string'
export const isArray: isSomeType<Array<any>> = (val: unknown) => Array.isArray(val)
export const isFunction: isSomeType<Function> = (val: unknown) => typeof val === 'function'

export const kindOf = ((cache) => (thing: unknown): string => {
  const str = toString.call(thing)
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase())
})(Object.create(null))

export const isPlainObject = (val: unknown) => {
  if (kindOf(val) !== 'object') return false
  const prototype = Object.getPrototypeOf(val)
  return (prototype === null || Object.getPrototypeOf(prototype) === null || prototype === Object.prototype)
    && !(Symbol.toStringTag in (val as Object))
    && !(Symbol.iterator in (val as Object))
}

export function forEach(
  obj: any,
  fn: (key: string | number, val: unknown) => any,
  config?: {
    allOwnKeys: boolean
  }
) {
  if (isUndefined(obj) || obj === null) return
  if (typeof obj !== 'object') {
    obj = [obj]
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      fn.call(null, index, item)
    })
  } else {
    const keys = config?.allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj)
    for (const key of keys) {
      fn.call(obj, key, obj[key])
    }
  }
}

export function merge(...args: unknown[]) {
  const result = {}

  const assignValue = (key: string | number, value: unknown) => {
    if (isPlainObject(result[key]) && isPlainObject(value)) {
      result[key] = merge(result[key], value)
      return
    }
    if (isPlainObject(value)) {
      result[key] = merge({}, value)
      return
    }
    if (Array.isArray(value)) {
      result[key] = [...value]
      return
    }
    result[key] = value
  }

  for (const arg in args) {
    forEach(arg, assignValue)
  }

  return result
}

export function bind<T extends Function>(fn: T, context: any): T {
  return fn.bind(context)
}

export function extend<T = any, U = any>(target: T, source: U, context: any = null): T & U {
  for (const key in source) {
    if (context && isFunction(source[key])) {
      (target as T & U)[key] = bind(source[key], context) as any
    } else {
      (target as T & U)[key] = source[key] as any
    }
  }

  return target as T & U
}
