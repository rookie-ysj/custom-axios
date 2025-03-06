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
