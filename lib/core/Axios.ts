import { AxiosRequestConfig, Method } from "@/types";
import xhr from "@/adapters/xhr.ts";
import { mergeConfig } from "@/core/mergeConfig.ts";
import { defaults } from "@/defaults";
import { buildFullPath } from "@/helpers/url.ts";

export default class Axios {
  public defaults: any
  constructor(defaultConfig: AxiosRequestConfig) {
    this.defaults = defaultConfig
    this.addMethodNoData()
    this.addMethodWithData()
  }

  public request(configOrUrl: AxiosRequestConfig | string, config: AxiosRequestConfig = {url: ''}) {
    try {
      return this._request(configOrUrl, config);
    } catch (e) {

    }
  }

  private _request(configOrUrl: AxiosRequestConfig | string, config: AxiosRequestConfig) {
    if (typeof configOrUrl === 'string') {
      config.url = configOrUrl
    } else {
      config = configOrUrl
    }

    config = mergeConfig(defaults, config);

    return xhr(config)
  }

  public getUri(config: AxiosRequestConfig) {
    config = mergeConfig(defaults, config);
    const { url, baseURL } = config;
    const path = buildFullPath(baseURL, url!);
    return path;
  }

  private addMethodNoData() {
    const methods = ['get', 'options', 'head', 'delete'] as Method[];
    methods.forEach((method) => {
      Axios.prototype[method] = (url: string, config?: AxiosRequestConfig) => this.request(mergeConfig(config || {}, {
        url,
        method,
      }))
    })
  }

  private addMethodWithData() {
    const methods = ['get', 'options', 'head', 'delete'] as Method[];
    methods.forEach((method) => {
      const generateHTTPMethod = (isForm: boolean = false) => {
        return (url: string, data?: any, config?: AxiosRequestConfig) => {
          return this.request(mergeConfig(config || {}, {
            url,
            method,
            headers: isForm ? {
              'Content-Type': 'application/json',
            } : {},
            data: data || {}
          }))
        }
      }

      Axios.prototype[method] = generateHTTPMethod(false)
      Axios.prototype[method+'Form'] = generateHTTPMethod(true)
    })
  }
}
