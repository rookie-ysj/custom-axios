import Axios from "@/core/Axios.ts";

export type Method =
  'get' | 'GET' |
  'post' | 'POST' |
  'put' | 'PUT' |
  'delete' | 'DELETE' |
  'options' | 'OPTIONS' |
  'head' | 'HEAD'

export interface AxiosRequestConfig {
  baseURL?: string
  url?: string
  method?: Method
  data?: unknown
  headers?: Record<string, unknown>
  timeout?: number
  adapter?: 'http' | 'fetch' | 'xhr'
  [key: string]: any
}

export interface AxiosHeaders extends Record<string, unknown> {}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  config: AxiosRequestConfig
  headers: AxiosHeaders
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosInstance extends Axios {
  create: (config: AxiosRequestConfig) => AxiosInstance;
  <T = any>(configOrUrl: AxiosRequestConfig | string, config?: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
}
