import { type Axios as IAxios, type AxiosRequestConfig, type Method } from "../types";
import { mergeConfig } from "./mergeConfig";
import { InterceptorManager } from "./InterceptorManager.ts";
import dispatchRequest from "./dispatchRequest.ts";

class Axios implements IAxios {
  public interceptors: Record<string, InterceptorManager>

  constructor(
    public defaults: AxiosRequestConfig
  ) {
    this.addMethodNoData()
    this.addMethodWithData()
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
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

  private _request(configOrUrl: string | AxiosRequestConfig, config: AxiosRequestConfig) {
    config = config || {}
    if (typeof configOrUrl === 'string') {
      config.url = configOrUrl
    } else {
      config = configOrUrl
    }

    config = mergeConfig(this.defaults, config)
    
    return dispatchRequest(config)
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


export default Axios
