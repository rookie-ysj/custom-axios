import { AxiosRequestConfig } from "@/types";
import { isUndefined } from "@/helpers/utils.ts";

interface MergeFunction<T = any, U = any> {
  (config1: T, config2: U): T & U
}

const getMergedValue: MergeFunction = <T = any, U = any>(config1 : T, config2 : U) => {
  return {
    ...config1,
    ...config2
  }
}

const valueFromConfig2: MergeFunction = <T = any, U = any>(config1: T, config2: U) => {
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
  }

  for (let key in Object.keys(Object.assign({}, config1, config2))) {
    const mergedValue = mergeMap[key](config1[key], config2[key])
    mergedValue || (config[key] = mergedValue)
  }

  return config
}
