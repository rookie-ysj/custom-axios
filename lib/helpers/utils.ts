export function extend<T, U>(to: T, from: U, context?: any): T & U {
  for (let key in from) {
    if (typeof from[key] === 'function' && context) {
      (to as T & U)[key] = from[key].bind(context)
    } else {
      (to as T & U)[key] = from[key] as any
    }
  }
  return to as T & U
}