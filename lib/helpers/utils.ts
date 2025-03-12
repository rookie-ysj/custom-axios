export function extend<T, U>(target: T, from: U, context: any = null): T & U {
  for (const key in from) {
    if (context && typeof from[key] === 'function') {
      (target as T & U)[key] = from[key].bind(context)
    } else {
      (target as T & U)[key] = from[key] as any
    }
  }
  return target as T & U
}

export interface isSomeType<T> {
  (value: unknown): value is T
}

export const isUndefined: isSomeType<undefined> = (val: unknown) => typeof val === 'undefined'


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
  }
  else {
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
