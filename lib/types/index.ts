export type Method = 
'get' | 'GET' | 
'post' | 'POST' | 
'put' | 'PUT' | 
'delete' | 'DELETE' | 
'head' | 'HEAD' | 
'options' | 'OPTIONS' | 
'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface Axios {
  request(configOrUrl: AxiosRequestConfig | string, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  create(config: AxiosRequestConfig): AxiosInstance
}
