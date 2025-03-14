export type Method =
'get' | 'GET'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'patch' | 'PATCH'

export interface AxiosHeaders {
  [key: string]: any
}

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any
  headers?: AxiosHeaders
  adapter?: 'xhr' | 'fetch' | 'http' | Function

  [k: string]: any
}

export interface AxiosResponse<T = any> {
  data: T,
  status: number,
  statusText: string,
  config: AxiosRequestConfig,
  headers: AxiosHeaders
}

export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosClass {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosInstance {
  Axios: AxiosClass;
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  create(config: AxiosRequestConfig): AxiosInstance;
  get: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  GET: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  post: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  POST: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  put: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  PUT: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  DELETE: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  head: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  HEAD: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  options: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  OPTIONS: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  patch: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  PATCH: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
}
