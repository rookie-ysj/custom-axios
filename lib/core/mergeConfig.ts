import { type AxiosRequestConfig } from "../types";
import { isPlainObject, isUndefined, merge } from "../utils";

function getMergedValue(target: unknown, source: unknown) {
  if (isPlainObject(target) && isUndefined(source)) {
    return merge(target, source);
  }
  if (isPlainObject(source)) {
    return merge({}, source)
  }
  if (Array.isArray(source)) {
    return [...source]
  }
  return source
}

function mergeFromConfig2(_config1: AxiosRequestConfig, config2: AxiosRequestConfig) {
  if (!isUndefined(config2)) {
    return getMergedValue(undefined, config2)
  }
}

function defaultToConfig2(config1: AxiosRequestConfig, config2: AxiosRequestConfig) {
  if (!isUndefined(config2)) {
    return merge(undefined, config2)
  }
  if (!isUndefined(config1)) {
    return merge(undefined, config1)
  }
}

function deepMerge() {

}

const configMap: Record<string, Function> = {
  url: mergeFromConfig2,
  method: mergeFromConfig2,
  data: mergeFromConfig2,
  headers: defaultToConfig2
}


export function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig) {
  const result: Record<string, any> = {}
  const keys = [...Object.keys(config1), ...Object.keys(config2)]
  console.log(config1, config2)
  for (const key of keys) {
    const mergeFn = configMap[key] || deepMerge
    if (mergeFn) {
      result[key] = mergeFn(config1[key], config2[key])
    }
  }
  return result
}
