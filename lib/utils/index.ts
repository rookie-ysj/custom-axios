import { type AxiosRequestConfig } from "../types";

export const typeOfTest = (type: unknown) => (val: unknown) => typeof val === type

export const isUndefined =(val: unknown): val is undefined => typeOfTest('undefined')(val)
export const isFunction =(val: unknown): val is Function => typeOfTest('function')(val)


export const kindof = (function(cache: Record<string, any>) {
  return (val: unknown) => {
    const str = Object.prototype.toString.call(val)
    return cache[str] || (cache[str] = Object.prototype.toString.call(val).slice(8, -1).toLowerCase())
  }
})({})

export function isPlainObject(val: any) {
  if (kindof(val) !== 'object') return false

  const prototype = Object.getPrototypeOf(val)
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

export function forEach(obj: any, fn: (val: any, key: string) => void) {
  if (typeof obj !== 'object' || obj === null) return
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn(obj[i], i + '')
    }
  } else if (isPlainObject(obj)) {
    for (const key in obj) {
      fn(obj[key], key)
    }
  }
}

export function merge(...args: unknown[]) {
  const result: Record<string, any> = {}

  const assignValue = (value: any, key: string) => {
    if (isPlainObject(result[key]) && isPlainObject(value)) {
      result[key] = merge(result[key], value)
    }
    else if (isPlainObject(value)) {
      result[key] = merge({}, value)
    }
    else {
      result[key] = value
    }
  }

  for (const arg of args) {
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
    }
    else {
      (target as T & U)[key] = source[key] as any
    }
  }

  return target as T & U
}
