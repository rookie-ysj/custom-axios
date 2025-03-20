import { AxiosError as IAxiosError, AxiosErrorCode, AxiosRequestConfig, AxiosResponse } from '../types'
import { isFunction } from "../helpers/utils.ts";

export default class AxiosError extends Error implements IAxiosError {
  public name = 'AxiosError'
  public isAxiosError: boolean

  constructor(
    public message: string,
    public code?: AxiosErrorCode,
    public config?: AxiosRequestConfig,
    public request?: IAxiosError['request'],
    public response?: AxiosResponse,
  ) {
    super(message);
    // 捕获错误堆栈信息
    // 如果Error.captureStackTrace函数存在（在V8引擎中可用），则使用它来捕获堆栈
    // 否则回退到创建新的Error对象来获取堆栈
    if (isFunction((Error as any).captureStackTrace)) {
      (Error as any).captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error().stack
    }

    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype)
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      config: this.config,
      request: this.request,
      response: this.response,
      stack: this.stack
    }
  }
}


const descriptors: Record<string, { value: AxiosErrorCode }> = {}

;([
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
] as AxiosErrorCode[]).forEach(code => {
  descriptors[code] = {value: code}
})

Object.defineProperties(AxiosError, descriptors)
console.log(AxiosError['ERR_BAD_OPTION_VALUE'])
