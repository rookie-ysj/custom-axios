import {
  type Axios as IAxios,
  AxiosPromise,
  type AxiosRequestConfig,
  AxiosResponse,
  InterceptorHandler,
  Interceptors,
  type Method
} from "../types";
import { mergeConfig } from "./mergeConfig";
import InterceptorManager from "./InterceptorManager.ts";
import dispatchRequest from "@/core/dispatchRequest.ts";

export default class Axios implements IAxios {
  public interceptors: Interceptors

  constructor(
    public defaults: AxiosRequestConfig
  ) {
    this.addMethodNoData()
    this.addMethodWithData()
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    }
  }

  public request(configOrUrl: string | AxiosRequestConfig, config: AxiosRequestConfig = {url: ''}) {
    try {
      return this._request(configOrUrl, config)
    } catch (error) {
      // todo 错误处理
      throw new Error('Axios request failed: ' + error)
    }
  }

  private _request(configOrUrl: string | AxiosRequestConfig, config: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    if (typeof configOrUrl === 'string') {
      config.url = configOrUrl
    } else {
      config = configOrUrl
    }

    config = mergeConfig(this.defaults, config)

    // let synchronousRequestInterceptors = false

    const chain: InterceptorHandler<any>[] = [{
      fulfilled: dispatchRequest.bind(this),
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift({
        fulfilled: interceptor.fulfilled,
        rejected: interceptor.rejected
      })
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push({
        fulfilled: interceptor.fulfilled,
        rejected: interceptor.rejected
      })
    })

    let i = 0
    let promise: AxiosPromise<AxiosRequestConfig>
    let len = 0

    // if (!synchronousRequestInterceptors) {
    len = chain.length
    promise = Promise.resolve(config) as AxiosPromise<AxiosRequestConfig>

    while (i < len) {
      promise = promise.then(chain[i].fulfilled, chain[i].rejected)
      i++
    }

    return promise
    // }

  }

  private addMethodNoData() {
    const methods = ['get', 'delete', 'head', 'options'] as Method[]

    const addMethod = (method: Method) => {
      (Axios.prototype as Record<string, any>)[method] = (url: string, config: AxiosRequestConfig) => {
        return this.request(mergeConfig(config || {}, {
          method,
          url
        }))
      }
    }

    methods.forEach(addMethod)
  }

  private addMethodWithData() {
    const methods = ['post', 'put', 'patch'] as Method[]

    methods.forEach(method => {
      const addMethod = (isForm: boolean) => {
          return (url: string, data: any, config?: AxiosRequestConfig) => {
            return this.request(mergeConfig(config || {}, {
              method,
              url,
              data,
              headers: isForm ? {
                'Content-Type': 'application/x-www-form-urlencoded'
              } : {},
            }))
          }
        }
      ;(Axios.prototype as Record<string, any>)[method] = addMethod(false)
      ;(Axios.prototype as Record<string, any>)[method + 'Form'] = addMethod(true)
    })
  }
}

