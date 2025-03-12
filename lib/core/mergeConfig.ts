import { AxiosRequestConfig } from "@/types";
import { isPlainObject, isUndefined, merge } from "@/helpers/utils.ts";

interface MergeFunction<T = any, U = any> {
  (config1: T, config2: U): T & U
}

const getMergedValue: MergeFunction = <T = any, U = any>(config1 : T, config2 : U) => {
  if (isPlainObject(config1) && isUndefined(config2)) {
    return merge(config1, config2)
  }
  if (isPlainObject(config2)) {
    return merge({}, config2)
  }
  if (Array.isArray(config2)) {
    return [...config2]
  }
  return config2
}

const mergeDeepProperties = <T = any, U = any>(config1 : T, config2 : U) => {
  if (!isUndefined(config2)) {
    return merge(config1, config2)
  }
  if (!isUndefined(config1)) {
    return merge(undefined, config1)
  }
}

const valueFromConfig2: MergeFunction = <T = any, U = any>(_config1: T, config2: U) => {
  if (!isUndefined(config2)) {
    return getMergedValue(undefined, config2)
  }
}

const defaultToConfig2: MergeFunction = <T = any, U = any>(config1: T, config2: U) => {
  if (!isUndefined(config2)) {
    return getMergedValue(undefined, config2)
  }
  if (!isUndefined(config1)) {
    return getMergedValue(undefined, config1)
  }
}

export function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig = {}): AxiosRequestConfig {
  const config = {}

  const mergeMap: Record<keyof AxiosRequestConfig, MergeFunction> = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    timeout: defaultToConfig2,
    headers: mergeDeepProperties,
  }

  for (let key in Object.keys(Object.assign({}, config1, config2))) {
    const mergedValue = mergeMap[key](config1[key], config2[key])
    mergedValue || (config[key] = mergedValue)
  }

  return config
}
